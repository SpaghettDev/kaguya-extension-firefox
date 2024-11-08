import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import FileUrl from "@src/core/FileUrl";
import { SearchResultType } from "@src/core/SearchResult";
import Video from "@src/core/Video";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { AnilistSearchResponse } from "@src/models/Anilist";
import { DataWithExtra } from "@src/types/utils";
import { parseNumberFromString } from "@src/utils";
import { load } from "cheerio";

export default class AnimeVietSub extends AnimeSource {
    baseURL: string;
    hasGotBaseURL: boolean;

    constructor() {
        super({
            name: "AnimeVietSub",
            id: "avs",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: "https://animevietsub.fun",
            quality: ["720p"],
            logo: "https://cdn.animevietsub.moe/data/logo/logoz.png",
        });

        this.baseURL = "";
        this.hasGotBaseURL = false;
    }

    async getBaseURL() {
        if (this.hasGotBaseURL) return;

        const response = await fetch("https://bit.ly/animevietsubtv");

        let href = response.url;

        if (!href) return;

        if (href.endsWith("/")) href = href.slice(0, -1);

        this.baseURL = href;
        this.hasGotBaseURL = true;

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "cookie",
                            operation: "append",
                            value: "avs__geoip_confirm=1",
                        },
                    ],
                },
                condition: {
                    requestDomains: [new URL(this.baseURL).host],
                },
            },
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Referer",
                            operation: "set",
                            value: this.baseURL,
                        },
                        {
                            header: "Origin",
                            operation: "set",
                            value: this.baseURL,
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
                    requestDomains: [
                        "storage.googleapiscdn.com",
                        "lh3.googleusercontent.com",
                        "stream.googleapiscdn.com",
                    ],
                    resourceTypes: ["xmlhttprequest", "media"],
                },
            },
        ];
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        await this.getBaseURL();

        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        await this.getBaseURL();

        const response = await fetch(
            `${this.baseURL}/phim/a-a${animeId}/xem-phim.html`
        );
        const text = await response.text();

        const $ = load(text);

        const episodes: EpisodeType[] = $(".episode a")
            .toArray()
            .map((episodeEl) => {
                const $el = $(episodeEl);

                const name = $el.attr("title");
                const number = parseNumberFromString(name, "Full").toString();
                const id = $el.data("id").toString();

                if (!name || !id) return;

                return { title: name, number, id };
            })
            .filter((a) => a);

        return episodes;
    }

    async loadVideoServers(episodeId: string): Promise<VideoServerType[]> {
        await this.getBaseURL();

        const response = await fetch(`${this.baseURL}/ajax/player?v=2019a`, {
            body: `episodeId=${episodeId}&backup=1`,
            redirect: "manual",
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        });
        const data = await response.json();

        const $ = load(data?.html);

        const servers: VideoServerType[] = $("a")
            .toArray()
            .filter((el) => $(el).data("play") === "api")
            .map((el) => {
                const $el = $(el);

                const id = $el.data("id") as string;
                const hash = $el.data("href") as string;
                const name = $el.text().trim();

                return { name, extraData: { id, hash }, embed: "" };
            });

        return servers;
    }

    async loadVideoContainer(
        _: VideoServerType,
        extraData?: Record<string, string>
    ): Promise<VideoContainerType> {
        await this.getBaseURL();

        const { id, hash } = extraData;

        const response = await fetch(`${this.baseURL}/ajax/player?v=2019a`, {
            body: `link=${hash}&id=${id}`,
            redirect: "manual",
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        });
        const data = await response.json();

        const sources: { file: string; label?: string; type: string }[] =
            data.link;

        return VideoContainer({
            videos: sources.map((source) =>
                Video({
                    file: FileUrl({
                        url: !source.file.includes("https")
                            ? `https://${source.file}`
                            : source.file,
                    }),
                    quality: source.label,
                })
            ),
        });
    }

    async search(query: string): Promise<SearchResultType[]> {
        await this.getBaseURL();

        const response = await fetch(
            `${this.baseURL}/tim-kiem/${encodeURIComponent(
                query.toLowerCase()
            ).replaceAll("%20", "+")}/`
        );
        const data = await response.text();

        const $ = load(data);

        const searchResults = $(".TPostMv")
            .toArray()
            .map((el) => {
                const url = $(el).find("a").attr("href");
                const id = urlToId(url);
                const title = $(el).find("h2").text();
                const thumbnail = $(el).find("img").attr("src");

                return {
                    id,
                    title,
                    thumbnail,
                };
            });

        return searchResults;
    }
}

const urlToId = (url: string) => {
    const splitted = url.split("/").filter((a) => a);
    const lastSplit = splitted[splitted.length - 1];

    return lastSplit.split("-").slice(-1)[0].split("a")[1];
};
