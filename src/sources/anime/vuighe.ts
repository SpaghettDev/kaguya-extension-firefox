import AnimeSource from "@src/core/AnimeSource";
import Episode, { EpisodeType } from "@src/core/Episode";
import SearchResult, { SearchResultType } from "@src/core/SearchResult";
import { SubtitleType } from "@src/core/Subtitle";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { parseNumberFromString } from "@src/utils";
import { load } from "cheerio";
export default class VuiGhe extends AnimeSource {
    constructor() {
        super({
            name: "VuiGhe",
            id: "vuighe",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: "https://vuighe3.com",
            quality: ["720p"],
            logo: "https://vuighe3.com/assets/img/logo_v8.png",
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
                            value: this.url + "/assassins-pride",
                        },
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
                    regexFilter: `(.*)${new URL(this.url).host}(.*)`,
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
                            value: this.url + "/assassins-pride",
                        },
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
                    regexFilter: "(.*)imacdn.com(.*)",
                },
            },
        ];

        console.log(`(.*)${new URL(this.url).host}(.*)`);
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
            extraData: searchResults?.[0]?.extra,
        };
    }

    async loadEpisodes(
        animeId: string,
        extraData: Record<string, string>
    ): Promise<EpisodeType[]> {
        if (!extraData?.slug) {
            throw new Error("Slug not found");
        }

        const watchPageResponse = await fetch(`${this.url}/${extraData.slug}`);
        const watchPageText = await watchPageResponse.text();

        const $ = load(watchPageText);

        const hasSeasons = !!$(".season-item").length;
        const seasons: { seasonName: string; fromEp: number; toEp: number }[] =
            [];

        // If the anime has many seasons, scrape those seasons
        if (hasSeasons) {
            $(".season-item").each((_, el) => {
                const seasonName = $(el).find(".season-item-name").text();

                // x - y
                const seasonRange = $(el).find(".season-item-range").text();

                const [from, to] = seasonRange.split(" - ");

                seasons.push({
                    seasonName,
                    fromEp: parseNumberFromString(from),
                    toEp: parseNumberFromString(to),
                });
            });
        }

        const episodesResponse = await fetch(
            `${this.url}/api/v2/films/${animeId}/episodes?sort=name`
        );
        const json = await episodesResponse.json();

        const episodes = json.data.map((episode) => {
            const section = (() => {
                if (!hasSeasons) return null;

                const season = seasons.find((season) => {
                    return (
                        season.fromEp <= episode.name &&
                        episode.name <= season.toEp
                    );
                });

                if (!season) return null;

                return season.seasonName;
            })();

            return Episode({
                id: episode.id.toString(),
                number: episode.name.toString(),
                title: episode.detail_name,
                thumbnail: episode.thumbnail_medium,
                section,
                extra: {
                    animeId,
                },
            });
        });

        return episodes;
    }

    async loadVideoServers(
        episodeId: string,
        extra: Record<string, string>
    ): Promise<VideoServerType[]> {
        const animeId = extra?.animeId;

        if (!animeId) throw new Error("Anime ID not found");

        const episodeResponse = await fetch(
            `${this.url}/api/v2/films/${animeId}/episodes/${episodeId}/true`
        );
        const episodeJson = await episodeResponse.json();

        const sources = episodeJson?.sources;

        if (!sources || !Object.keys(sources)?.length)
            throw new Error("Sources not found");

        const videoServers: VideoServerType[] = [];

        const subtitles: SubtitleType[] = [];

        if (episodeJson.subtitle && !Array.isArray(episodeJson.subtitle)) {
            for (const language in episodeJson.subtitle) {
                const subtitle = episodeJson.subtitle[language];

                subtitles.push({
                    language,
                    file: {
                        url: `${this.url}/subtitle/${subtitle}.vtt`,
                    },
                });
            }
        }

        // If there is no m3u8 stream, it is an empty array
        // If there is m3u8 stream, it is an object
        // I don't know why they designed their API like that
        if (sources.m3u8 && !Array.isArray(sources.m3u8)) {
            const keys = Object.keys(sources.m3u8);

            const stream = encodeString(
                sources.m3u8[keys[0]],
                Number(episodeId) % 100
            );

            videoServers.push({
                name: "SG",
                extraData: {
                    stream,
                    subtitles: JSON.stringify(subtitles),
                },
                embed: "",
            });
        }

        if (sources.fb?.length) {
            const source = sources.fb[0];

            const stream = encodeString(source.src, Number(episodeId) % 100);

            videoServers.push({
                name: "FB",
                extraData: {
                    stream,
                    quality: source.quality,
                    subtitles: JSON.stringify(subtitles),
                },
                embed: "",
            });
        }

        if (sources.vip?.length) {
            const source = sources.vip[0];

            videoServers.push({
                name: "VIP",
                extraData: {
                    stream: source.src,
                    quality: source.quality,
                    subtitles: JSON.stringify(subtitles),
                },
                embed: "",
            });
        }

        return videoServers;
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const subtitles = JSON.parse(
            videoServer?.extraData?.subtitles ?? "[]"
        ) as SubtitleType[];

        return VideoContainer({
            videos: [
                {
                    file: { url: videoServer?.extraData?.stream },
                    quality: videoServer?.extraData?.quality,
                },
            ],
            subtitles,
        });
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response = await fetch(
            `${this.url}/api/v2/search?q=${encodeURIComponent(query)}&limit=24`
        );

        const data = await response.json();

        return data.data.map((result) =>
            SearchResult({
                id: result.id,
                title: result.name,
                thumbnail: result.thumbnail,
                extra: {
                    slug: result.slug,
                },
            })
        );
    }
}

const encodeString = (e: string, t: number) => {
    let a = "";

    for (var i = 0; i < e.length; i++) {
        var r = e.charCodeAt(i) ^ t;
        a += String.fromCharCode(r);
    }

    return a;
};
