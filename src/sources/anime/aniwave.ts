import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import Subtitle from "@src/core/Subtitle";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { captialize } from "@src/utils";
import { load } from "cheerio";

export default class AniWave extends AnimeSource {
    constructor() {
        super({
            name: "AniWave",
            id: "aniwave",
            languages: ["English"],
            isNSFW: false,
            url: "https://aniwave.to",
            quality: ["1080p", "720p"],
            logo: "https://s2.bunnycdn.ru/assets/sites/aniwave/logo3.png",
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
                            value: "https://vizcloud.co/",
                            operation: "set",
                        },
                        {
                            header: "Origin",
                            value: "https://vizcloud.co/",
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    regexFilter: "(.*)vizcloud.co(.*)",
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
                            header: "Referer",
                            value: "https://vidrock.pro/",
                            operation: "set",
                        },
                        {
                            header: "Origin",
                            value: "https://vidrock.pro/",
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    regexFilter: "(.*)vidrock.pro(.*)",
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
                            header: "Referer",
                            value: "https://vidplay.online/",
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    requestDomains: ["vidplay.online"],
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
                            header: "Referer",
                            value: "https://mcloud.bz/",
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    requestDomains: ["mcloud.bz"],
                },
            },
        ];
    }

    async search(query: string): Promise<SearchResultType[]> {
        const { url, vrfQuery } = await this.getVRF(query, "9anime-search");

        const encodedQuery = encodeURIComponent(query);

        const response = await fetch(
            `${this.url}/filter?keyword=${encodedQuery}&${vrfQuery}=${url}`
        );

        const text = await response.text();

        const $ = load(text);

        const searchResults: SearchResultType[] = $("#list-items .item")
            .toArray()
            .map((itemEl) => {
                const $el = $(itemEl);

                const image = $el.find("img").attr("src");
                const name = $el.find(".name").text();

                const url = $el.find("a").attr("href");
                const slug = url.split("/").filter(Boolean)[1].split(".")[1];

                // 2444?/cachedb6710
                const id = ($el.find(".poster").data("tip") as string)
                    .split("/")[0]
                    .replace("?", "");

                return {
                    id,
                    thumbnail: image,
                    title: name,
                    extra: { slug },
                };
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
        const { url, vrfQuery } = await this.getVRF(
            animeId,
            "ajax-episode-list"
        );

        const response = await fetch(
            `${this.url}/ajax/episode/list/${animeId}?${vrfQuery}=${url}`
        );

        const json = await response.json();

        const result = json?.result;

        if (!result) throw new Error("Result not found");

        const $ = load(result);

        const episodes: EpisodeType[] = $(".episodes li")
            .toArray()
            .flatMap((el) => {
                const $el = $(el);

                const idsString = $el.find("a").data("ids") as string;
                const ids = idsString.split(",");

                const title = $el.find(".d-title").text();
                const number = $el.find("a").data("num").toString() as string;

                const hasDub = $el.find("a").data("dub") === 1;

                if (hasDub) {
                    // If has dub and has 3 IDs
                    // [sub, soft-sub, dub]
                    if (ids.length === 3) {
                        return [
                            {
                                id: ids[0],
                                number,
                                title,
                                section: "Sub",
                            },
                            {
                                id: ids[1],
                                number,
                                title,
                                section: "Soft sub",
                            },
                            {
                                id: ids[2],
                                number,
                                title,
                                section: "Dub",
                            },
                        ];
                    }

                    if (ids.length === 2) {
                        return [
                            {
                                id: ids[0],
                                number,
                                title,
                                section: "Sub",
                            },
                            {
                                id: ids[1],
                                number,
                                title,
                                section: "Dub",
                            },
                        ];
                    }
                }

                // The episode has both sub and dub
                // [sub, soft-sub]
                if (ids.length > 1) {
                    return [
                        {
                            id: ids[0],
                            number,
                            title,
                            section: "Sub",
                        },
                        {
                            id: ids[1],
                            number,
                            title,
                            section: "Soft sub",
                        },
                    ];
                }

                return {
                    id: ids[0],
                    number,
                    title,
                    section: "Sub",
                };
            });

        return episodes;
    }

    async loadVideoServers(episodeId: string): Promise<VideoServerType[]> {
        const { vrfQuery, url } = await this.getVRF(
            episodeId,
            "ajax-server-list"
        );

        const response = await fetch(
            `${this.url}/ajax/server/list/${episodeId}?${vrfQuery}=${url}`
        );
        const json = await response.json();

        const html = json?.result;

        if (!html) throw new Error("Result not found");

        const $ = load(html);

        const allowedServers = ["Filemoon"];

        const servers: VideoServerType[] = $(".servers ul li")
            .toArray()
            .map((el) => {
                const $el = $(el);

                const serverId = $el.data("sv-id") as string;
                const linkId = $el.data("link-id") as string;

                const serverName = $el.text();

                return {
                    embed: "",
                    name: serverName,
                    extraData: {
                        id: serverId,
                        link: linkId,
                    },
                };
            })
            .filter((server) => allowedServers.includes(server.name));

        return servers;
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        if (!videoServer?.extraData?.link) throw new Error("ID not found");

        const { vrfQuery, url: vrf } = await this.getVRF(
            videoServer.extraData.link,
            "ajax-server"
        );

        const response = await fetch(
            `${this.url}/ajax/server/${videoServer.extraData.link}?${vrfQuery}=${vrf}`
        );

        const json = await response.json();

        const url = json?.result?.url;
        const skipData = json?.result?.skip_data;

        if (!url) throw new Error("URL not found");

        const decryptedSourceUrl = await this.decryptSource(url);

        const videoContainer = VideoContainer({ videos: [], subtitles: [] });

        if (videoServer.name === "Vidstream") {
            const vidstreamID = decryptedSourceUrl.split("/").pop();

            const { stream, subtitles } = await this.getVidstreamLink(
                vidstreamID
            );

            videoContainer.videos = [{ file: { url: stream } }];
            videoContainer.subtitles = subtitles.map((subtitle) =>
                Subtitle({
                    file: { url: subtitle.file },
                    language: subtitle.label,
                })
            );
        } else if (videoServer.name === "Filemoon") {
            const filemoonHTML = await fetch(decryptedSourceUrl).then((res) =>
                res.text()
            );

            const m3u8File = await this.getFilemoonLink(filemoonHTML);

            videoContainer.videos = [{ file: { url: m3u8File } }];
        } else {
            const mCloudID = decryptedSourceUrl.split("/").pop();
            const { stream, subtitles } = await this.getVidstreamLink(
                mCloudID,
                false
            );

            videoContainer.videos = [{ file: { url: stream } }];
            videoContainer.subtitles = subtitles.map((subtitle) =>
                Subtitle({
                    file: { url: subtitle.file },
                    language: subtitle.label,
                })
            );
        }

        if (skipData) {
            try {
                // {intro: [0, 100], outro: [0, 100]}
                const decryptedSkipData = JSON.parse(
                    await this.decryptSource(skipData)
                );

                videoContainer.timestamps = Object.entries(
                    decryptedSkipData
                ).map(([key, value]) => {
                    return {
                        type: captialize(key),
                        startTime: value[0],
                        endTime: value[1],
                    };
                });

                console.log(videoContainer);
            } catch (err) {
                console.log("[Aniwave] Failed to parse skip data");
            }
        }
        return videoContainer;
    }

    async getVRF(
        query: string,
        action: string
    ): Promise<{ url: string; vrfQuery: string }> {
        const encodedQuery = encodeURIComponent(query);

        const response = await fetch(
            `https://9anime.anify.tv/${action}?query=${encodedQuery}&apikey=enimax`
        );
        const json = await response.json();

        return json;
    }

    async decryptSource(query: string): Promise<string> {
        const encodedQuery = encodeURIComponent(query);

        const url = `https://9anime.anify.tv/decrypt?query=${encodedQuery}&apikey=enimax`;

        const response = await fetch(url);
        const json = await response.json();

        if (!json?.url) {
            throw new Error("Received an empty URL or the URL was not found.");
        }

        return json.url;
    }

    async getVidstreamLink(
        query: string,
        isViz = true
    ): Promise<{
        stream: string;
        subtitles: { file: string; kind: string; label: string }[];
    }> {
        let reqURL = `https://9anime.anify.tv/raw${
            isViz ? "Vizcloud" : "Mcloud"
        }?query=${encodeURIComponent(query)}&apikey=enimax`;

        const futokenResponse = await fetch("https://vidplay.online/futoken");
        const futoken = await futokenResponse.text();

        const sourceResponse = await fetch(reqURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                query,
                futoken,
            }),
        }).then((res) => res.json());

        const rawSource = sourceResponse.rawURL;

        const source = await fetch(rawSource, {
            headers: {
                "x-requested-with": "XMLHttpRequest",
            },
        }).then((res) => res.json());

        if (!source?.result?.sources?.[0]?.file) {
            throw new Error(
                "VIZCLOUD1: Received an empty URL or the URL was not found."
            );
        }

        return {
            stream: source.result.sources[0].file,
            subtitles:
                source.result?.tracks?.filter(
                    (track) => track.kind === "captions"
                ) || [],
        };
    }

    async getFilemoonLink(filemoonHTML: string): Promise<string> {
        let reqURL = "https:/9anime.anify.tv/filemoon?apikey=enimax";

        const source = await fetch(reqURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                query: filemoonHTML,
            }),
        }).then((res) => res.json());

        if (!source?.url) {
            throw new Error(
                "VIZCLOUD1: Received an empty URL or the URL was not found."
            );
        }

        return source.url;
    }
}
