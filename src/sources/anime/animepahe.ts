import AnimeSource from "@src/core/AnimeSource";
import Episode, { EpisodeType } from "@src/core/Episode";
import SearchResult, { SearchResultType } from "@src/core/SearchResult";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoFormat, VideoType } from "@src/core/Video";
import VideoServer, { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { parseBetween } from "@src/utils";
import { load } from "cheerio";
import {
    PaheAPISearchResponse, PaheAPIReleaseResponse,
    PaheApiReleaseEpisode,
} from "@models/anime/animepahe";

export default class AnimePahe extends AnimeSource {
    constructor() {
        super({
            name: "AnimePahe",
            id: "animepahe",
            languages: ["English"],
            isNSFW: false,
            url: "https://animepahe.ru",
            quality: ["1080p", "720p"],
            logo: "https://animepahe.ru/app/images/apdoesnthavelogotheysaidapistooplaintheysaid.svg",
        });

        this.isHardsubbed = false;

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                        {
                            header: "Access-Control-Allow-Origin",
                            operation: "set",
                            value: "*",
                        },
                        {
                            header: "Access-Control-Allow-Methods",
                            operation: "set",
                            value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                        },
                    ],
                    requestHeaders: [
                        {
                            header: "Referer",
                            value: "https://kwik.si/",
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    regexFilter: "(kwik.si|nextcdn)",
                },
            },
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Origin",
                            operation: "remove",
                        },
                        {
                            header: "Referer",
                            operation: "remove",
                        },
                    ],
                },
                condition: {
                    requestDomains: ["i.animepahe.ru"],
                },
            },
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Cookie",
                            value: "__ddgid_=; __ddg2_=; __ddg1_=",
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    requestDomains: ["animepahe.ru"],
                },
            },
        ];
    }

    async search(query: string): Promise<SearchResultType[]> {
        const encodedQuery = encodeURIComponent(query);

        const response: PaheAPISearchResponse = await fetch(
            `${this.url}/api?m=search&q=${encodedQuery}`
        ).then((res) => res.json());

        if (!response?.data?.length) return [];

        const searchResults = response.data.map((item) => {
            return SearchResult({
                id: item.id.toString(),
                thumbnail: item.poster,
                title: item.title,
            });
        });

        return searchResults;
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response = await fetch(`${this.url}/a/${animeId}`).then((res) =>
            res.text()
        );

        const animeSession = parseBetween(response, 'let id = "', '"');

        const rawEpisodes = await this.loadAllEpisodes(animeSession);

        const episodes = rawEpisodes.map((episode) =>
            Episode({
                id: episode.session,
                number: episode.episode.toString(),
                thumbnail: episode.snapshot,
                isFiller: !!episode.filler,
                extra: {
                    animeSession,
                },
            })
        );

        return episodes;
    }

    async loadAllEpisodes(animeSession: string) {
        const episodes: PaheApiReleaseEpisode[] = [];

        const load = async (page: number = 1) => {
            const episodeResponse: PaheAPIReleaseResponse = await fetch(
                `${this.url}/api?m=release&id=${animeSession}&sort=episode_asc&page=${page}`
            ).then((res) => res.json());

            if (episodeResponse?.data?.length) {
                episodes.push(...episodeResponse.data);
            }

            if (!episodeResponse?.next_page_url) return episodes;

            return load(page + 1);
        };

        return load(1);
    }

    async loadVideoServers(
        episodeId: string,
        extra: Record<string, string>
    ): Promise<VideoServerType[]> {
        if (!extra?.animeSession) throw new Error("ID not found");

        const url = `${this.url}/play/${extra.animeSession}/${episodeId}`;

        const response = await fetch(url).then((res) => res.text());

        const $ = load(response);

        const servers = $("#resolutionMenu button")
            .toArray()
            .map((el) => {
                const button = $(el);

                return VideoServer({
                    embed: button.data("src") as string,
                    name: button.text().trim(),
                });
            });

        return servers;
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const response = await fetch(videoServer.embed, {
            headers: { "Referer": "https://animepahe.ru/" }
        }).then((res) => res.text());
        
        const packedString =
            "eval(function(p,a,c,k,e,d)" +
            parseBetween(
                response,
                "<script>eval(function(p,a,c,k,e,d)",
                "</script>"
            );
        const unpacked = unpack(packedString) as string;

        const stream = unpacked.match(/https.*?m3u8/g)?.[0];

        if (!stream) return null;
        
        const video: VideoType = { file: { url: stream }};
        
        const streamData = videoServer.name.match(
            /^(.+?)\s*·\s*(\d+p)\s*\(([\d.]+MB)\)(?: (\S+))?$/
        );
        if (streamData) {
            const [_, serverName, res, size] = streamData;

            video.format = VideoFormat.CONTAINER;
            video.quality = res;
        }

        return VideoContainer({
            videos: [video]
        });
    }
}

function unpack(source: string): string {
    /* Unpacks P.A.C.K.E.R. packed js code. */
    let { payload, symtab, radix, count } = _filterargs(source);

    if (count != symtab.length) {
        throw Error("Malformed p.a.c.k.e.r. symtab.");
    }

    let unbase: Unbaser;

    try {
        unbase = new Unbaser(radix);
    } catch (e) {
        throw Error("Unknown p.a.c.k.e.r. encoding.");
    }

    function lookup(match: string): string {
        /* Look up symbols in the synthetic symtab. */
        const word = match;
        let word2: string;

        if (radix == 1) {
            //throw Error("symtab unknown");
            word2 = symtab[parseInt(word)];
        } else {
            word2 = symtab[unbase.unbase(word)];
        }

        return word2 || word;
    }

    source = payload.replace(/\b\w+\b/g, lookup);
    return _replacestrings(source);

    function _filterargs(source: string) {
        /* Juice from a source file the four args needed by decoder. */
        const juicers = [
            /}\('(.*)', *(\d+|\[\]), *(\d+), *'(.*)'\.split\('\|'\), *(\d+), *(.*)\)\)/,
            /}\('(.*)', *(\d+|\[\]), *(\d+), *'(.*)'\.split\('\|'\)/,
        ];
        for (const juicer of juicers) {
            //const args = re.search(juicer, source, re.DOTALL);
            const args = juicer.exec(source);
            if (args) {
                let a = args;
                if (a[2] == "[]") {
                    //don't know what it is
                    // a = list(a);
                    // a[1] = 62;
                    // a = tuple(a);
                }
                try {
                    return {
                        payload: a[1],
                        symtab: a[4].split("|"),
                        radix: parseInt(a[2]),
                        count: parseInt(a[3]),
                    };
                } catch (ValueError) {
                    throw Error("Corrupted p.a.c.k.e.r. data.");
                }
            }
        }

        throw Error(
            "Could not make sense of p.a.c.k.e.r data (unexpected code structure)"
        );
    }

    function _replacestrings(source: string): string {
        /* Strip string lookup table (list) and replace values in source. */
        /* Need to work on this. */
        return source;
    }
}

class Unbaser {
    /* Functor for a given base. Will efficiently convert
      strings to natural numbers. */
    protected ALPHABET: Record<number, string> = {
        62: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        95: "' !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'",
    };
    protected base: number;
    protected dictionary: Record<string, number> = {};

    constructor(base: number) {
        this.base = base;

        // fill elements 37...61, if necessary
        if (36 < base && base < 62) {
            this.ALPHABET[base] =
                this.ALPHABET[base] || this.ALPHABET[62].substring(0, base);
        }
        // If base can be handled by int() builtin, let it do it for us
        if (2 <= base && base <= 36) {
            this.unbase = (value) => parseInt(value, base);
        } else {
            // Build conversion dictionary cache
            try {
                [...this.ALPHABET[base]].forEach((cipher, index) => {
                    this.dictionary[cipher] = index;
                });
            } catch (er) {
                throw Error("Unsupported base encoding.");
            }
            this.unbase = this._dictunbaser;
        }
    }

    public unbase: (a: string) => number;

    private _dictunbaser(value: string): number {
        /* Decodes a value to an integer. */
        let ret = 0;
        [...value].reverse().forEach((cipher, index) => {
            ret = ret + this.base ** index * this.dictionary[cipher];
        });
        return ret;
    }
}
