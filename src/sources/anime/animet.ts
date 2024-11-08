import AnimeSource from "@src/core/AnimeSource";
import Episode, { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import { VideoFormat } from "@src/core/Video";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import VideoServer, { VideoServerType } from "@src/core/VideoServer";
import { AnilistSearchResponse } from "@src/models/Anilist";
import { DataWithExtra } from "@src/types/utils";
import { Wise_EvalDecode } from "@src/unpackers/wise";
import {
    isValidUrl,
    parseBetween,
    parseNumberFromString,
    serialize,
} from "@src/utils";
import { evalScript } from "@src/utils/eval";
import { load } from "cheerio";

const BASE_URL = "https://animet2.net";

export default class AnimeT extends AnimeSource {
    constructor() {
        super({
            name: "AnimeT",
            id: "animet",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: BASE_URL,
            quality: ["720p"],
            logo: `${BASE_URL}/Theme_Anime/img/favicon.ico`,
        });

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Referer",
                            operation: "set",
                            value: BASE_URL,
                        },
                        {
                            header: "Origin",
                            operation: "set",
                            value: BASE_URL,
                        },
                    ],
                },
                condition: {
                    requestDomains: ["api.anime3s.com", BASE_URL],
                    resourceTypes: ["xmlhttprequest"],
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
                            value: "https://api.anime3s.com/",
                        },
                        {
                            header: "Origin",
                            operation: "set",
                            value: "https://api.anime3s.com/",
                        },
                    ],
                },
                condition: {
                    regexFilter: "^https://(.*)/video.mp4(.*)",
                    resourceTypes: ["media", "xmlhttprequest"],
                },
            },
        ];
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const infoPageResponse = await fetch(
            `${BASE_URL}/phim-a-${animeId}.html`
        );
        const infoPage = await infoPageResponse.text();
        const $info = load(infoPage);

        const watchPageUrl = $info("header .Image a").attr("href");

        const watchPageResponse = await fetch(watchPageUrl);
        const watchPage = await watchPageResponse.text();
        const $ = load(watchPage);

        const episodes: EpisodeType[] = $(".server")
            .toArray()
            .flatMap((serverEl) => {
                const $el = $(serverEl);

                const serverName = $el
                    .find(".server-name")
                    .text()
                    .replace(":", "")
                    .trim();

                const episodeList = $el
                    .find(".list-episode li a")
                    .toArray()
                    .map((episodeEl) => {
                        const $episodeEl = $(episodeEl);

                        const name = $episodeEl.text().trim();

                        const id = $episodeEl.data("ep").toString();

                        if (!name || !id) return;

                        return Episode({
                            id,
                            number: parseNumberFromString(
                                name,
                                "Full"
                            ).toString(),
                            section: serverName,
                            extra: {
                                animeId,
                            },
                        });
                    });

                return episodeList;
            })
            .filter((a) => a);

        return episodes;
    }

    async loadVideoServers(
        episodeId: string,
        extraData?: Record<string, string>
    ): Promise<VideoServerType[]> {
        const animeId = extraData?.animeId;

        const response = await fetch(
            `${BASE_URL}/phim-a-${animeId}.${episodeId}.html`
        );
        const data = await response.text();
        const $ = load(data);

        const servers: VideoServerType[] = $("#list-server1 .option span")
            .toArray()
            .map((el) => {
                const server = $(el);
                const name = server.text().split(" ")[0];

                let endpoint = "";
                let sv = "";

                if (name === "FB") {
                    endpoint = "player";
                    sv = "0";
                } else if (name === "GG") {
                    endpoint = "player_streamvn";
                    sv = "gp-0";
                } else if (name === "Tik") {
                    endpoint = "LoadPlayer_photov2";
                    sv = "gp-0";
                }

                return VideoServer({
                    name,
                    extraData: {
                        ep: episodeId,
                        id: extraData?.animeId,
                        sv,
                        endpoint,
                    },
                    embed: "",
                });
            });

        return servers.filter(
            (server) => !server.name.toLowerCase().includes("hrx")
        );
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const { extraData } = videoServer;

        const { endpoint, id, ep, sv } = extraData;

        const response = await fetch(`${BASE_URL}/ajax/${endpoint}`, {
            method: "post",
            body: serialize({
                id,
                ep,
                sv,
            }),
            headers: {
                Origin: BASE_URL,
                Referer: BASE_URL,
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
            },
        });

        const text = await response.text();

        const $ = load(text);

        const src = $("iframe").attr("src");

        if (!isValidUrl(src)) return null;

        const iframeResponse = await fetch(src, {
            headers: {
                referer: BASE_URL,
            },
        });
        const iframeText = await iframeResponse.text();

        const packed =
            ";eval" + parseBetween(iframeText, ";eval", "'));") + "'));";

        const unpacked = await Wise_EvalDecode(packed);

        const sources = await evalScript<
            { file: string; label: string; type: "mp4" }[]
        >(parseBetween(unpacked, "{sources:", ",image"));

        return VideoContainer({
            videos: sources
                .filter((source) => source.file)
                .map((source) => ({
                    file: {
                        url: source.file,
                    },
                    format: VideoFormat.CONTAINER,
                    quality: source.label,
                })),
        });
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response = await fetch(
            `${BASE_URL}/tim-kiem/${encodeURIComponent(query)}.html`
        );
        const data = await response.text();

        const $ = load(data);

        const searchResults = $(".TPostMv")
            .toArray()
            .map((el) => {
                const url = $(el).find("a").attr("href");
                const id = url.split("-").slice(-1)[0].replace(".html", "");
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
