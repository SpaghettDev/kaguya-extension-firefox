import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import FileUrl from "@src/core/FileUrl";
import { SearchResultType } from "@src/core/SearchResult";
import Subtitle, { SubtitleFormat, SubtitleType } from "@src/core/Subtitle";
import { VideoFormat } from "@src/core/Video";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { extractVariables, getSecret, decryptSource } from "@src/extractors/zoro";
import { DataWithExtra } from "@src/types/utils";
import { addRules } from "@src/utils/rules";
import { load } from "cheerio";

interface ZoroSearchResponse {
    status: boolean;
    html: string
};

interface ZoroEpisodesResponse {
    status: boolean;
    html: string;
    totalItems: number;
    continueWatch: unknown | null
};

interface ZoroEpisodeServersResponse {
    status: boolean;
    html: string;
};

interface ZoroEpisodeSourceResponse {
    type: string;
    link: string;
    server: number;
    sources: unknown[];
    tracks: unknown[];
    htmlGuide: string;
};

interface EpisodeSourceResponseEncrypted {
    sources: string;
    tracks: ({
        file: string;
        label: string;
        default?: boolean;
        kind: "captions";
    } | {
        file: string;
        kind: "thumbnails";
    })[];
    encrypted: true;
    intro: {
        start: number;
        end: number;
    };
    outro: {
        start: number;
        end: number;
    };
    server: number;
};

interface EpisodeSourceResponseDecrypted {
    sources: { url: string; type: VideoFormat }[];
    tracks: ({
        file: string;
        label: string;
        default?: boolean;
        kind: "captions";
    } | {
        file: string;
        kind: "thumbnails";
    })[];
    encrypted?: false;
    intro: {
        start: number;
        end: number;
    };
    outro: {
        start: number;
        end: number;
    };
    server: number;
};

type EpisodeSourceResponse = EpisodeSourceResponseEncrypted | EpisodeSourceResponseDecrypted;

interface DecryptedEpisodeSource {
    file: string;
    type: VideoFormat;
};


interface ZoroSearchAnime {
    id: string;
    title: string;
    jp_title: string;
    alias: string;
    poster: string;
    release_date: string;
    type: string;
    ep_length: string;
};

interface ZoroEpisode {
    id: string;
    title: string;
    jp_title: string;
    number: number;
    href: string;
};

interface ZoroEpisodeServer {
    id: string;
    name: string;
    type: "sub" | "dub" | "raw";
    serverId: number;
};


class ZoroSearchResult {
    status: boolean;
    animes: ZoroSearchAnime[];

    constructor({ status, html }: ZoroSearchResponse) {
        this.status = status;
        this.animes = [];

        const $ = load(html.trim());

        $("a").each((_, el) => {
            const href = $(el).attr("href");

            if (!href || href.startsWith("/search"))
                return;

            const id = href.slice(1).split("?ref=")[0].split("-").at(-1);
            const poster = $(el).find(".film-poster .film-poster-img").attr("data-src") as string;

            const srp_detail = $(el).find(".srp-detail");

            const title = srp_detail.find(".film-name").text() as string;
            const jp_title = srp_detail.find(".film-name").attr("data-jname") as string;
            const alias = srp_detail.find(".alias-name").text() as string;
            const release_date = srp_detail.find(".film-infor span").eq(0).text() as string;
            const type = srp_detail.find(".film-infor .dot").first()[0]?.nextSibling?.nodeValue as string;
            const ep_length = srp_detail.find(".film-infor span").eq(1).text() as string;

            this.animes.push({
                id,
                title,
                jp_title,
                alias,
                poster,
                release_date,
                type,
                ep_length
            });
        })
    }
};

class ZoroEpisodesResult {
    status: boolean;
    episodes: ZoroEpisode[];
    totalItems: number;
    continueWatch: unknown | null;

    constructor({ status, html, totalItems, continueWatch }: ZoroEpisodesResponse) {
        this.status = status;
        this.episodes = [];
        this.totalItems = totalItems;
        this.continueWatch = continueWatch;

        const $ = load(html);

        $(".seasons-block .detail-seasons .detail-infor-content .ss-list a").each((_, el) => {
            const id = $(el).attr("data-id");
            const title = $(el).attr("title");
            const jp_title = $(el).find(".ssli-detail .ep-name").attr("data-jname");
            const number = Number($(el).attr("data-number"));
            const href = $(el).attr("href");

            this.episodes.push({
                id,
                title,
                jp_title,
                number,
                href
            });
        });
    }
};

class ZoroEpisodeServers {
    status: boolean;
    subServers: ZoroEpisodeServer[];
    dubServers: ZoroEpisodeServer[];
    rawServers: ZoroEpisodeServer[];

    constructor({ status, html }: ZoroEpisodeServersResponse) {
        this.status = status;
        this.subServers = [];
        this.dubServers = [];

        const $ = load(html);

        $(".ps_-block.ps_-block-sub.servers-sub .ps__-list .item.server-item").each((_, el) => {
            const id = $(el).attr("data-id");
            const name = $(el).find(".btn").text();
            const type = "sub";
            const serverId = $(el).attr("data-server-id");

            this.subServers.push({
                id,
                name,
                type,
                serverId
            });
        });

        $(".ps_-block.ps_-block-sub.servers-dub .ps__-list .item.server-item").each((_, el) => {
            const id = $(el).attr("data-id");
            const name = $(el).find(".btn").text();
            const type = "dub";
            const serverId = $(el).attr("data-server-id");

            this.dubServers.push({
                id,
                name,
                type,
                serverId
            });
        });

        $(".ps_-block.ps_-block-sub.servers-raw .server-item").each((_, el) => {
            const id = $(el).attr("data-id");
            const name = $(el).find(".btn").text();
            const type = "raw";
            const serverId = $(el).attr("data-server-id");

            this.dubServers.push({
                id,
                name,
                type,
                serverId
            });
        });
    }
};

const ZoroServerNames = {
    4: "vidstreaming",
    1: "vidcloud",
    5: "streamsb",
    3: "streamtape",
};

export default class Zoro extends AnimeSource {
    constructor() {
        super({
            name: "Zoro",
            id: "zoro",
            languages: ["English"],
            isNSFW: false,
            url: "https://hianime.to",
            quality: ["1080p", "720p"],
            logo: "https://hianime.to/images/icons-192.png",
        });

        this.isHardsubbed = false;
    }

    async search(query: string): Promise<SearchResultType[]> {
        if (!query) return [];

        if (query === "null") return [];

        const response: ZoroSearchResponse = await fetch(
            `${this.url}/ajax/search/suggest?keyword=${encodeURIComponent(query)}`, {
                headers: {
                    Referer: `${this.url}/search?keyword=${encodeURIComponent(query)}`,
                    Cookie: `userSettings=${encodeURIComponent(JSON.stringify(
                        {
                            "auto_play": 1,
                            "auto_next": 1,
                            "auto_skip_intro": 1,
                            "show_comments_at_home": 1,
                            "public_watch_list": 0,
                            // TODO: enable dubs later
                            "enable_dub": 0,
                            "anime_name": "en",
                            "play_original_audio": 0
                        }
                    ))}`
                },
            }
        ).then((res) => res.json());

        const zoroResp = new ZoroSearchResult(response);

        return zoroResp.animes.map((item) => ({
            id: item.id,
            thumbnail: item.poster,
            title: item.title
        } as SearchResultType));
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response: ZoroEpisodesResponse = await fetch(
            `${this.url}/ajax/v2/episode/list/${animeId}`
        ).then((res) => res.json());

        const zoroResp = new ZoroEpisodesResult(response);

        return zoroResp.episodes.map((ep) => ({
            id: ep.id,
            number: ep.number.toString(),
            title: ep.title,
        } as EpisodeType));
    }

    async loadVideoServers(
        episodeId: string,
        extraData?: Record<string, string>
    ): Promise<VideoServerType[]> {
        const response: ZoroEpisodeServersResponse = await fetch(
            `${this.url}/ajax/v2/episode/servers?episodeId=${episodeId}`
        ).then((res) => res.json());

        const zoroResp = new ZoroEpisodeServers(response);

        return [
            ...zoroResp.subServers,
            ...zoroResp.dubServers,
            ...zoroResp.rawServers
        ].map((server) => {
            const serverName = ZoroServerNames[server.serverId] || "vidcloud";

            return {
                name: `${server.type}-${serverName}`,
                embed: "",
                extraData: {
                    id: server.id,
                    serverName: serverName,
                    category: server.type,
                }
            } as VideoServerType;
        });
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const episodeId = videoServer.extraData.id!;
        const serverName = videoServer.extraData.serverName!;
        const category = videoServer.extraData.category!;

        const response: ZoroEpisodeSourceResponse = await fetch(
            `${this.url}/ajax/v2/episode/sources?id=${episodeId}`
        ).then((res) => res.json());
        const container = VideoContainer({
            videos: [],
            subtitles: [],
            timestamps: [],
        });

        const serverResponse: EpisodeSourceResponse = await fetch(
            this.getSourceLink(response.link)
        ).then((res) => res.json());

        const subtitles: SubtitleType[] = serverResponse?.tracks
            ?.filter((track) => track.kind === "captions")
            .map((track) => ({
                file: { url: track.file },
                language: track.label,
            } as SubtitleType));

        container.subtitles = subtitles;

        if (serverResponse?.intro) {
            container.timestamps.push({
                type: "Intro",
                startTime: serverResponse.intro.start,
                endTime: serverResponse.intro.end,
            });
        }

        if (serverResponse?.outro) {
            container.timestamps.push({
                type: "Outro",
                startTime: serverResponse.outro.start,
                endTime: serverResponse.outro.end,
            });
        }

        let sources: DecryptedEpisodeSource[];

        if (serverResponse.encrypted) {
            const jsplayerScript = await fetch(
                this.getZoroJSPlayerUrl(response.link)
            ).then((res) => res.text());

            const variables = extractVariables(jsplayerScript);

            if (!variables.length) return null;

            const { secret, encryptedSource } = getSecret(
                serverResponse.sources, variables
            );

            const decrypted = decryptSource(encryptedSource, secret);

            sources = JSON.parse(decrypted);

            sources.forEach((source) => {
                container.videos.push({
                    file: { url: source.file },
                    format: source.type,
                });
            });
        } else {
            const resp = serverResponse as EpisodeSourceResponseDecrypted;

            sources = resp.sources.map((source) => ({
                file: source.url,
                type: source.type,
            } as DecryptedEpisodeSource));

            resp.sources.forEach((source) => {
                container.videos.push({
                    file: { url: source.url },
                    format: source.type,
                });
            });
        }

        await addRules(
            sources.map((source) => {
                return {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        requestHeaders: [
                            {
                                header: "Referer",
                                operation: "set",
                                value: new URL(source.file).origin,
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
                        requestDomains: [new URL(source.file).hostname],
                    }
                }
            })
        );

        return container;
    }

    getSourceLink(link: string): string {
        const linkURL = new URL(link);
        linkURL.search = "";

        const sourceLink = new URL(linkURL);

        const pathname = linkURL.pathname.split("/");

        pathname.splice(2, 0, "ajax");
        const id = pathname.splice(-1, 1, "getSources")[0];

        sourceLink.pathname = pathname.join("/");
        sourceLink.searchParams.append("id", id);

        return sourceLink.toString();
    }

    getZoroJSPlayerUrl(link: string): string {
        return `${
            (new URL(link)).origin
        }/js/player/a/prod/e1-player.min.js?v=${Date.now()}`;
    }
}
