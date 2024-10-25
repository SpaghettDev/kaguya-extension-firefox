import AnimeSource from "@src/core/AnimeSource";
import { DataWithExtra } from "@src/types/utils";
import { EpisodeType } from "@src/core/Episode";
import { load } from "cheerio";
import { parseNumberFromString } from "@src/utils";
import { VideoServerType } from "@src/core/VideoServer";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { SearchResultType } from "@src/core/SearchResult";

export default class AnimeHay extends AnimeSource {
    baseURL: string;
    hasGotBaseURL: boolean;

    constructor() {
        super({
            name: "AnimeHay",
            id: "ah",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: "a",
            quality: ["720p"],
            logo: `a/themes/img/logo.png`,
        });

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Origin",
                            operation: "set",
                            value: "https://suckplayer.xyz",
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
                    regexFilter: "https://suck",
                    requestMethods: ["get"],
                    resourceTypes: ["xmlhttprequest", "media"],
                },
            },

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
                            header: "Origin",
                            operation: "remove",
                        },
                        {
                            header: "Referer",
                            operation: "set",
                            value: "https://thenoobpro16.shop",
                        },
                    ],
                },
                condition: {
                    regexFilter: "(.*)thenoobpro(.*).shop(.*)",
                    resourceTypes: ["xmlhttprequest", "media"],
                },
            },

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
                },
                condition: {
                    regexFilter: "(.*)rapovideo(.*).xyz(.*)",
                    resourceTypes: ["xmlhttprequest", "media"],
                },
            },
        ];

        this.baseURL = "";
        this.hasGotBaseURL = false;
    }

    async getBaseURL() {
        // if (this.hasGotBaseURL) return;

        // const response = await fetch("https://animehay.tv");
        // const text = await response.text();

        // const $ = load(text);

        // let href = $(".bt-link").attr("href");

        // if (!href) return;

        // if (href.endsWith("/")) href = href.slice(0, -1);

        // this.baseURL = href;
        // this.hasGotBaseURL = true;

        if (this.hasGotBaseURL) return;

        this.baseURL = "http://77.73.70.149";
        this.hasGotBaseURL = true;
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
        await this.getBaseURL();

        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        await this.getBaseURL();

        const response = await fetch(
            `${this.baseURL}/thong-tin-phim/a-${animeId}.html`
        );
        const text = await response.text();
        const $ = load(text);

        const episodeList: EpisodeType[] = $(".list-item-episode > a")
            .toArray()
            .map((episodeEl) => {
                const $el = $(episodeEl);

                const sourceEpisodeId =
                    ($el.attr("href").match(/-(\d+)\.html$/) || [])[1] || null;
                const name = $el.text().trim();

                const number = parseNumberFromString(name, "Full")?.toString();

                if (!sourceEpisodeId || !number) return null;

                return {
                    id: sourceEpisodeId,
                    number,
                };
            });

        return episodeList;
    }

    async loadVideoServers(episodeId: string): Promise<VideoServerType[]> {
        await this.getBaseURL();

        const response = await fetch(
            `${this.baseURL}/xem-phim/a-${episodeId}.html`
        );
        const text = await response.text();

        const pattern = /(?<=['"(])(https?:\/\/\S+)(?=['")])/gi;
        const matches = text.matchAll(pattern);

        const servers: VideoServerType[] = [];

        for (const match of matches) {
            const url = match[0];
            let name = "";

            if (url.includes("cdninstagram.com")) {
                name = "FBO";
            } else if (url.includes("suckplayer.xyz")) {
                name = "VPRO";
            } else if (url.includes("rapovideo.xyz")) {
                name = "Tik";
            } else {
                continue;
            }

            servers.push({
                embed: "",
                name,
                extraData: {
                    link: url,
                },
            });
        }

        return servers;
    }

    async loadVideoContainer(
        server: VideoServerType
    ): Promise<VideoContainerType> {
        await this.getBaseURL();

        const { link } = server.extraData;

        if (server.name === "FBO" || server.name === "Tik") {
            return VideoContainer({
                videos: [
                    {
                        quality: "720p",
                        file: {
                            url: link,
                        },
                    },
                ],
            });
        }

        if (server.name === "VPRO") {
            const data = await this.getFirePlayerUrl(link);
            return VideoContainer({
                videos: [
                    {
                        quality: "720p",
                        file: {
                            url: data.url,
                        },
                    },
                ],
            });
        }
    }

    async getFirePlayerUrl(url: string) {
        const id = url.split("/")[4];

        const formData = new URLSearchParams();
        formData.append("r", this.baseURL);
        formData.append("hash", id);

        const response = await fetch(
            `https://suckplayer.xyz/player/index.php?data=${id}&do=getVideo`,
            {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            }
        );

        const jsonObject = await response.json();
        const link = jsonObject.securedLink;

        return {
            url: link,
        };
    }

    async search(query: string): Promise<SearchResultType[]> {
        await this.getBaseURL();

        const response = await fetch(`${this.baseURL}/api`, {
            headers: {
                "content-type": "application/json",
            },
            referrer: this.baseURL,
            body: `{\"action\":\"live_search\",\"keyword\":\"${query}\"}`,
            method: "POST",
        });

        const json = await response.json();

        if (!json?.result) return [];

        const $ = load(json.result);
        const linkElements = $(`a[href*="/thong-tin-phim/"]`);

        const data = linkElements
            .map((_, element) => {
                const href = $(element).attr("href");
                const thumbnail = $(element).find("img").attr("src");

                const thumbnailUrl = new URL(thumbnail);
                const baseUrl = new URL(this.baseURL);

                thumbnailUrl.host = baseUrl.host;
                thumbnailUrl.protocol = baseUrl.protocol;

                const title = $(element).find(".fw-500").text().trim();
                const id = urlToId(href);

                return { thumbnail: thumbnailUrl.toString(), title, id };
            })
            .get();

        return data;
    }
}

function urlToId(url: string) {
    const splitted = url.split("/");
    const lastSplit = splitted[splitted.length - 1];

    return lastSplit.split("-").slice(-1)[0].replace(".html", "");
}
