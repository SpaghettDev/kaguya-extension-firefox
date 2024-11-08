import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import { VideoFormat } from "@src/core/Video";
import { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { AnilistSearchResponse } from "@src/models/Anilist";
import { DataWithExtra } from "@src/types/utils";
import packedDecode from "@src/unpackers/packed";
import { parseBetween, parseNumberFromString } from "@src/utils";
import { load } from "cheerio";

export default class HHHay extends AnimeSource {
    hasGotBaseURL = false;
    constructor() {
        super({
            name: "HHHay",
            id: "hhhay",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: "https://hhhay.tv",
            quality: ["720p", "1080p"],
            logo: `a/themes/img/logo.png`,
        });

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "X-Requested-With",
                            operation: "set",
                            value: "XMLHttpRequest",
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
                    regexFilter: "https://hhhay",
                },
            },
        ];

        this.hasGotBaseURL = false;
    }

    async getBaseURL() {
        if (this.hasGotBaseURL) return;

        const response = await fetch("https://bit.ly/hhhay", {
            method: "HEAD",
            redirect: "follow",
        });

        if (!response.url) throw new Error("Failed to get base URL");

        if (response.url.endsWith("/")) {
            this.url = response.url.slice(0, -1);
        } else {
            this.url = response.url;
        }

        this.hasGotBaseURL = true;
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        await this.getBaseURL();

        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
            extraData: searchResults?.[0]?.extra,
        };
    }

    async loadEpisodes(
        animeId: string,
        extra: Record<string, string>
    ): Promise<EpisodeType[]> {
        await this.getBaseURL();

        const response = await fetch(`${this.url}/${animeId}`);
        const text = await response.text();
        const $ = load(text);

        const episodeList: EpisodeType[] = $("#listsv-1 > li")
            .toArray()
            .map((episodeEl) => {
                const $el = $(episodeEl);

                const sourceEpisodeId = $el
                    .find("a")
                    .attr("href")
                    ?.split("/")
                    .slice(-1)[0]
                    .replace(".html", "");
                const name = $el.text().trim();

                const number = parseNumberFromString(name, "Full")?.toString();

                if (!sourceEpisodeId || !number) return null;

                return {
                    id: sourceEpisodeId + "-" + extra.postId,
                    number,
                    extra: {
                        animeId,
                        postId: extra.postId,
                    },
                };
            })
            .filter(Boolean);

        return episodeList;
    }

    async loadVideoServers(
        episodeId: string,
        extra: Record<string, string>
    ): Promise<VideoServerType[]> {
        await this.getBaseURL();

        if (!extra.animeId) throw new Error("Missing animeId");
        if (!extra.postId) throw new Error("Missing postId");

        // tap-13-sv1-0000 => tap-13
        const episodeSlug = episodeId.split("-").slice(0, 2).join("-");

        const response = await fetch(
            `${this.url}/wp-content/themes/linhminazmovies/player.php?episode_slug=${episodeSlug}&server_id=1&subsv_id=&post_id=${extra.postId}&custom_var=`
        );

        const json = await response.json();

        const sources = json?.data?.sources;

        if (!sources) return [];

        const $ = load(sources);

        const iframe = $("iframe").attr("src");

        return [
            {
                embed: iframe,
                name: "SV 1",
                extraData: extra,
            },
        ];
    }

    async loadVideoContainer(
        server: VideoServerType
    ): Promise<VideoContainerType> {
        await this.getBaseURL();

        const response = await fetch(server.embed);

        const text = await response.text();

        const packed =
            "eval(function(p,a,c,k,e,d)" +
            parseBetween(
                text,
                "<script>eval(function(p,a,c,k,e,d)",
                "</script>"
            );

        if (!packed) throw new Error("Cannot find packed code");

        const unpacked = (await packedDecode(packed)) as string;

        const kaken = parseBetween(unpacked, 'window.kaken="', '"');

        const domain = new URL(server.embed).origin;

        if (!kaken) throw new Error("Cannot find kaken code");

        const apiResponse = await fetch(`${domain}/api/?${kaken}`);

        const json = await apiResponse.json();

        const sources = json?.sources as {
            file: string;
            type: string;
            label: string;
            default: boolean;
        }[];

        if (!sources) throw new Error("Cannot find sources");

        return {
            videos: sources.map((source) => ({
                file: { url: source.file },
                format: VideoFormat.HLS,
            })),
        };
    }

    async search(query: string): Promise<SearchResultType[]> {
        await this.getBaseURL();

        const response = await fetch(
            `${this.url}/search/${encodeURIComponent(query).replaceAll(
                "%20",
                "+"
            )}`,
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );

        // If the website only returns a single result, it will redirect to that anime page
        if (response.redirected) {
            const redirectUrl = response.url;
            const html = await response.text();

            if (!html) return [];

            const $ = load(html);

            const bookmark = $("#bookmark");

            const postId = bookmark.data("post_id") as string;
            const thumbnail = bookmark.data("thumbnail") as string;
            const title = bookmark.data("title") as string;
            const id = redirectUrl.split("/").slice(-1)[0];

            return [
                {
                    id,
                    title,
                    thumbnail,
                    extra: {
                        postId,
                    },
                },
            ];
        }

        const html = await response.text();

        if (!html) return [];

        const $ = load(html);

        const posts = $(".halim_box article").toArray();

        const searchResults: SearchResultType[] = posts.map((post) => {
            const $el = $(post);

            const id = $el.find("a").attr("href").split("/").slice(-1)[0];
            const img = $el.find("img").data("src") as string;

            const title = $el.find(".entry-title").text().trim();

            const postId = $el
                .attr("class")
                .split(" ")
                .slice(-1)[0]
                .split("-")
                .slice(-1)[0];

            return {
                id,
                title,
                thumbnail: img,
                extra: {
                    postId,
                },
            };
        });

        return searchResults;
    }
}
