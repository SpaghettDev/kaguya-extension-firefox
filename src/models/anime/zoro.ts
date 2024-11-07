import { VideoFormat } from "@src/core/Video";
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
    sources: {
        url: string;
        type: VideoFormat
    }[];
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
            const poster = $(el).find(".film-poster .film-poster-img").attr("data-src");

            const srp_detail = $(el).find(".srp-detail");

            const title = srp_detail.find(".film-name").text();
            const jp_title = srp_detail.find(".film-name").attr("data-jname");
            const alias = srp_detail.find(".alias-name").text();
            const release_date = srp_detail.find(".film-infor span").eq(0).text();
            const type = (
                srp_detail.find(".film-infor .dot").first()[0]?.nextSibling as unknown as Element
            )?.nodeValue ;
            const ep_length = srp_detail.find(".film-infor span").eq(1).text();

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
            const serverId = Number($(el).attr("data-server-id"));

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
            const serverId = Number($(el).attr("data-server-id"));

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
            const serverId = Number($(el).attr("data-server-id"));

            this.dubServers.push({
                id,
                name,
                type,
                serverId
            });
        });
    }
};


export {
    ZoroSearchResponse, ZoroEpisodesResponse,
    ZoroEpisodeServersResponse, ZoroEpisodeSourceResponse,
    EpisodeSourceResponseEncrypted,
    EpisodeSourceResponseDecrypted,
    EpisodeSourceResponse, DecryptedEpisodeSource,
    ZoroSearchAnime, ZoroEpisode,
    ZoroEpisodeServer, ZoroSearchResult,
    ZoroEpisodesResult, ZoroEpisodeServers,
};
