import AnimeSource from "@src/core/AnimeSource";
import Episode, { EpisodeType } from "@src/core/Episode";
import FileUrl from "@src/core/FileUrl";
import SearchResult, { SearchResultType } from "@src/core/SearchResult";
import { VideoFormat } from "@src/core/Video";
import { VideoContainerType } from "@src/core/VideoContainer";
import VideoServer, { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { isFulfilled } from "@src/utils";
import CryptoJS from "crypto-js";

export default class KickAssAnime extends AnimeSource {
    constructor() {
        super({
            name: "KickAssAnime",
            id: "gogo",
            languages: ["English"],
            isNSFW: false,
            url: "https://kickassanime.am",
            quality: ["1080p", "720p"],
            logo: "https://kickassanime.am/favicon.ico",
        });

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
                            header: "Origin",
                            value: "https://vidnethub.net",
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    regexFilter:
                        "((.*)(st1|omegatoki).(.*).(jpg|vtt)|(.*)vidnethub(.*)|(.*)kaav3.com(.*))",
                    requestMethods: ["get"],
                    resourceTypes: ["xmlhttprequest"],
                },
            },
        ];
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response = await fetch("https://kickassanime.am/api/search", {
            method: "POST",
            body: JSON.stringify({ query }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        const searchResults: SearchResultType[] = json.map((data) =>
            SearchResult({
                id: data.slug,
                thumbnail: this.createPoster(data.poster),
                title: data.title_en,
            })
        );

        return searchResults;
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
        const data = await this.totalSearch(anilist);

        return {
            data: data?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response = await fetch(
            `https://www.kickassanime.am/api/show/${animeId}/language`
        );

        const json = await response.json();

        let languages = ["ja-JP"];

        if (json?.result?.length) {
            languages = json.result;
        }

        const episodePromises = languages.map(async (language) => {
            const episodes = await this.loadEpisodesByLanguage(
                animeId,
                language
            );

            return episodes;
        });

        const episodeChunks = await Promise.allSettled(episodePromises);

        const fulfilledChunks = episodeChunks.filter(isFulfilled);
        const chunkedEpisodes = fulfilledChunks.map((chunk) => chunk.value);

        const episodes = chunkedEpisodes.flat();

        return episodes;
    }

    async loadEpisodesByLanguage(
        animeId: string,
        language: string
    ): Promise<EpisodeType[]> {
        const response = await fetch(
            `https://kickassanime.am/api/show/${animeId}/episodes?lang=${language}`
        );
        const json = await response.json();

        const episodes: EpisodeType[] = json?.result?.map((episode) =>
            Episode({
                id: episode.slug,
                number: episode.episode_string,
                title: episode.title,
                thumbnail: this.createThumbnail(episode.thumbnail),
                extra: {
                    animeId,
                    slug: `ep-${episode.episode_string}-${episode.slug}`,
                },
                section: language,
            })
        );

        return episodes;
    }

    async loadVideoServers(
        _: string,
        extraData?: Record<string, string>
    ): Promise<VideoServerType[]> {
        if (!extraData?.animeId || !extraData?.slug) return;

        const animeId = extraData.animeId;
        const slug = extraData.slug;

        const response = await fetch(
            `https://kickassanime.am/api/show/${animeId}/episode/${slug}`
        );
        const json = await response.json();

        return json?.servers?.map((server) =>
            VideoServer({
                embed: server.src,
                name: server.name,
                extraData: { shortName: server.shortName },
            })
        );
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        if (!videoServer.embed || !videoServer?.extraData?.shortName) return;

        const shortName = videoServer.extraData.shortName.toLowerCase();

        const videoContainer: VideoContainerType = {
            videos: [],
            subtitles: [],
            timestamps: [],
        };

        try {
            const url = new URL(videoServer.embed);

            const response = await fetch(
                "https://raw.githubusercontent.com/enimax-anime/gogo/main/KAA.json"
            );
            const json = await response.json();

            const order = json[shortName];

            const playerResponse = await fetch(url.toString());
            const playerHTML = await playerResponse.text();

            const isBirb = shortName === "bird";
            const usesMid = shortName === "duck";

            const cid = playerHTML.split("cid:")[1].split("'")[1].trim();
            const metaData = CryptoJS.enc.Hex.parse(cid).toString(
                CryptoJS.enc.Utf8
            );
            const sigArray = [];

            let key = "";

            try {
                const res = await fetch(
                    `https://raw.githubusercontent.com/enimax-anime/kaas/${shortName}/key.txt`
                );

                if (res.status === 404) {
                    throw new Error("Not found");
                } else {
                    key = await res.text();
                }
            } catch (err) {
                const res = await fetch(
                    `https://raw.githubusercontent.com/enimax-anime/kaas/duck/key.txt`
                );

                if (res.status === 404) {
                    throw new Error("Not found");
                } else {
                    key = await res.text();
                }
            }

            const signatureItems = {
                SIG: playerHTML.split("signature:")[1].split("'")[1].trim(),
                USERAGENT: navigator.userAgent,
                IP: metaData.split("|")[0],
                ROUTE: metaData
                    .split("|")[1]
                    .replace("player.php", "source.php"),
                KEY: key,
                TIMESTAMP: Math.floor(Date.now() / 1000),
                MID: url.searchParams.get(usesMid ? "mid" : "id"),
            };

            for (const item of order) {
                sigArray.push(signatureItems[item]);
            }

            const sig = CryptoJS.SHA1(sigArray.join("")).toString(
                CryptoJS.enc.Hex
            );

            const requestUrl = `${url.origin}${signatureItems.ROUTE}?${
                !usesMid ? "id" : "mid"
            }=${signatureItems.MID}${
                isBirb ? "" : "&e=" + signatureItems.TIMESTAMP
            }&s=${sig}`;

            const finalResponse = await fetch(requestUrl, {
                headers: {
                    referer: `${url.origin}${signatureItems.ROUTE.replace(
                        "source.php",
                        "player.php"
                    )}?${!usesMid ? "id" : "mid"}=${signatureItems.MID}`,
                },
            });

            const responseJSON = await finalResponse.json();

            const result = responseJSON.data;

            const finalResult = JSON.parse(
                CryptoJS.AES.decrypt(
                    result.split(":")[0],
                    CryptoJS.enc.Utf8.parse(signatureItems.KEY),
                    {
                        mode: CryptoJS.mode.CBC,
                        iv: CryptoJS.enc.Hex.parse(result.split(":")[1]),
                        keySize: 256,
                    }
                ).toString(CryptoJS.enc.Utf8)
            );

            if (finalResult.skip?.intro) {
                videoContainer.timestamps.push({
                    type: "Intro",
                    startTime: finalResult.skip.intro.start,
                    endTime: finalResult.skip.intro.end,
                });
            }

            let hlsURL = "",
                dashURL = "";

            if (finalResult.hls) {
                hlsURL = finalResult.hls.startsWith("//")
                    ? `https:${finalResult.hls}`
                    : finalResult.hls;

                videoContainer.videos.push({
                    file: FileUrl({ url: hlsURL }),
                    format: VideoFormat.HLS,
                });
            }

            if (finalResult.dash) {
                dashURL = finalResult.dash.startsWith("//")
                    ? `https:${finalResult.dash}`
                    : finalResult.dash;

                videoContainer.videos.push({
                    file: FileUrl({ url: dashURL }),
                    format: VideoFormat.DASH,
                });
            }

            if (finalResult.subtitles) {
                const url = dashURL === "" ? hlsURL : dashURL;

                finalResult.subtitles.map((sub) => {
                    videoContainer.subtitles.push({
                        file: FileUrl({
                            url: sub.src.startsWith("//")
                                ? `https:${sub.src}`
                                : new URL(sub.src, url).href,
                        }),
                        language: sub.name,
                    });
                });
            }

            return videoContainer;
        } catch (err) {
            console.error(err);
        }
    }

    createPoster(poster) {
        return `https://kickassanime.am/image/poster/${poster.hq}.webp`;
    }

    createThumbnail(poster) {
        return `https://kickassanime.am/image/thumbnail/${poster.hq}.webp`;
    }
}
