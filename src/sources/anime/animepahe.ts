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
import { AnilistSearchResponse } from "@src/models/Anilist";
import { addRules } from "@src/utils/rules";
import { unpack } from "@src/utils/unpacker";

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
        const response: PaheAPISearchResponse = await fetch(
            `${this.url}/api?m=search&q=${encodeURIComponent(query)}`
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

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
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
        const unpacked = unpack(packedString);

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

        await addRules([{
            priority: 1,
            action: {
                type: "modifyHeaders",
                requestHeaders: [
                    {
                        header: "Referer",
                        operation: "set",
                        value: new URL(stream).origin,
                    },
                ],
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
            },
            condition: {
                requestDomains: [new URL(stream).hostname],
            }
        }]);

        return VideoContainer({
            videos: [video]
        });
    }
}
