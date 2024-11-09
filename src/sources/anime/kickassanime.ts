import AnimeSource from "@src/core/AnimeSource";
import Episode, { EpisodeType } from "@src/core/Episode";
import { addRules } from "@src/utils/rules";
import SearchResult, { SearchResultType } from "@src/core/SearchResult";
import { VideoFormat } from "@src/core/Video";
import { VideoContainerType } from "@src/core/VideoContainer";
import VideoServer, { VideoServerType } from "@src/core/VideoServer";
import { AnilistSearchResponse } from "@src/models/Anilist";
import { DataWithExtra } from "@src/types/utils";
import { isFulfilled } from "@src/utils";
import {
    KickAssSourceResponse,
    KickAssAnimePoster,
    KickAssEpisodeResponse, KickAssEpisodesResponse,
    KickAssLanguageResponse,
    KickAssSearchResult,
    KickAssDecryptedSource,
    KickAssBirdResponse,
} from "@models/anime/kickassanime";
import CryptoJS from "crypto-js";
import { load } from "cheerio";
import { SubtitleFormat } from "@src/core/Subtitle";

const serverToKey = {
    "vid": "e13d38099bf562e8b9851a652d2043d3",
    "duck": "4504447b74641ad972980a6b8ffd7631",
    "bird": "4b14d0ff625163e3c9c7a47926484bf2",
} as const;

const serverToOrder = {
    "vid": ["IP", "USERAGENT", "ROUTE", "MID", "TIMESTAMP", "KEY"],
    "duck": ["IP", "USERAGENT", "ROUTE", "MID", "TIMESTAMP", "KEY"],
    "bird": ["IP", "USERAGENT", "ROUTE", "MID", "KEY"],
} as const;

const resolutions = {
    "7680x4320": "8K",
    "3840x2160": "4K",
    "1920x1080": "FHD",
    "1280x720": "HD",
    "852x480": "WVGA",
    "640x360": "nHD",
    "426x240": "WQVGA",
    "256x144": "QQVGA",
} as const;

export default class KickAssAnime extends AnimeSource {
    constructor() {
        super({
            name: "KickAssAnime",
            id: "gogo",
            languages: ["English"],
            isNSFW: false,
            url: "https://kickassanimes.io",
            quality: ["1080p", "720p"],
            logo: "https://kickassanimes.io/favicon.ico",
        });
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response: KickAssSearchResult[] = await fetch(`${this.url}/api/search`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ query }),
        }).then((res) => res.json());

        return response.map((data) =>
            SearchResult({
                id: data.slug,
                thumbnail: this.createPoster(data.poster),
                title: data.title_en,
            })
        );
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const data = await this.totalSearch(anilist);

        return {
            data: data?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response: KickAssLanguageResponse = await fetch(
            `${this.url}/api/show/${animeId}/language`
        ).then((res) => res.json());

        let languages = ["ja-JP"];

        if (response?.result?.length) {
            languages = response.result;
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
        const response: KickAssEpisodesResponse = await fetch(
            `${this.url}/api/show/${animeId}/episodes?lang=${language}`
        ).then((res) => res.json());

        return response?.result?.map((episode) =>
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
    }

    async loadVideoServers(
        _: string,
        extraData?: Record<string, string>
    ): Promise<VideoServerType[]> {
        if (!extraData?.animeId || !extraData?.slug) return;

        const animeId = extraData.animeId;
        const slug = extraData.slug;

        const response: KickAssEpisodeResponse = await fetch(
            `${this.url}/api/show/${animeId}/episode/${slug}`
        ).then((res) => res.json());

        return response?.servers?.map((server) =>
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

            const order = serverToOrder[shortName];

            const isBirb = shortName === "bird";
            const usesMid = shortName === "duck";
            
            if (isBirb) {
                const sourceResponse: KickAssBirdResponse = await fetch(
                    url.toString().replace("player.php", "source.php")
                ).then((res) => res.json());

                const manifest = await fetch(`${sourceResponse.manifest}`).then((res) => res.text());
                const $ = load(manifest, { xml: true });

                $("MPD Period AdaptationSet Representation").each((_, el) => {
                    const mimeType = $(el).attr("mimeType");
                    const width = Number($(el).attr("width"));
                    const height = Number($(el).attr("height"));

                    const link = $(el).find("BaseURL").text();

                    switch (mimeType) {
                        case "video/mp4":
                            videoContainer.videos.push({
                                file: { url: link },
                                quality: this.getVideoResolution(width, height),
                                format: VideoFormat.DASH,
                            });
                        break;

                        case "audio/mp4":
                            // ?
                        break;
                    }
                });

                if (sourceResponse?.subtitles) {
                    sourceResponse.subtitles.forEach((sub) => {
                        videoContainer.subtitles.push({
                            file: {
                                url: sub.src.startsWith("//")
                                    ? `https:${sub.src}`
                                    : new URL(sub.src, url).href
                                },
                            language: sub.name,
                            format:
                                sub.filename.split(".").at(-1).toLowerCase() as SubtitleFormat,
                        });
                    })
                }
            } else {
                const playerResponse = await fetch(url.toString()).then((res) => res.text());

                const cid = playerResponse.split("cid:")[1].split("'")[1].trim();
                const metaData = CryptoJS.enc.Hex.parse(cid).toString(
                    CryptoJS.enc.Utf8
                );
                const sigArray = [];
    
                const key = serverToKey[shortName] ?? "";
    
                const signatureItems = {
                    SIG: playerResponse.split("signature:")[1].split("'")[1].trim(),
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
                }=${signatureItems.MID}&e=${signatureItems.TIMESTAMP}&s=${sig}`;
    
                const finalResponse: KickAssSourceResponse = await fetch(requestUrl, {
                    headers: {
                        referer: `${url.origin}${signatureItems.ROUTE.replace(
                            "source.php",
                            "player.php"
                        )}?${!usesMid ? "id" : "mid"}=${signatureItems.MID}`,
                    },
                }).then((res) => res.json());
    
                const result = finalResponse.data;
    
                const finalResult: KickAssDecryptedSource = JSON.parse(
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
    
                let hlsURL = "";
    
                if (finalResult.hls) {
                    hlsURL = finalResult.hls.startsWith("//")
                        ? `https:${finalResult.hls}`
                        : finalResult.hls;
    
                    videoContainer.videos.push({
                        file: { url: hlsURL },
                        format: VideoFormat.HLS,
                    });
                }
    
                if (finalResult.subtitles) {
                    finalResult.subtitles.forEach((sub) => {
                        videoContainer.subtitles.push({
                            file: {
                                url: sub.src.startsWith("//")
                                    ? `https:${sub.src}`
                                    : new URL(sub.src, hlsURL).href
                            },
                            language: sub.name,
                        });
                    });
                }
            }

            // why dont the requestHeaders get applied ffs i will literally kms
            await addRules(
                videoContainer.videos.map((video) => {
                    const videoURL = new URL(video.file.url);

                    return {
                        priority: 1,
                        action: {
                            type: "modifyHeaders",
                            requestHeaders: [
                                {
                                    header: "Origin",
                                    operation: "set",
                                    value: videoURL.origin,
                                },
                                {
                                    header: "Referer",
                                    operation: "set",
                                    value: videoURL.origin,
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
                            requestDomains: [videoURL.hostname],
                        }
                    }
                })
            );

            return videoContainer;
        } catch (err) {
            console.error(err);
        }
    }

    createPoster(poster: KickAssAnimePoster): string {
        return `https://kickassanimes.io/image/poster/${poster.hq}.webp`;
    }

    createThumbnail(poster: KickAssAnimePoster): string {
        return `https://kickassanimes.io/image/thumbnail/${poster.hq}.webp`;
    }

    getVideoResolution(width: number, height: number): string {
        const resStr = `${width}x${height}`;
        return resolutions[resStr] ?? resStr;
    }
}
