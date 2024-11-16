import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import { VideoFormat, VideoType } from "@src/core/Video";
import { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import {
    AnivibeEpisodesResponse,
    AnivibeSearchResponse,
    AnivibeServersResponse
} from "@models/anime/anivibe";
import { AnilistSearchResponse } from "@src/models/Anilist";
import {
    extractMP4Upload,
    extractStreamwish,
    extractVidhide,
} from "@src/extractors/common";
import { addRules } from "@src/utils/rules";

export default class Anivibe extends AnimeSource {
    constructor() {
        super({
            name: "Anivibe",
            id: "anivibe",
            languages: ["English"],
            isNSFW: false,
            url: "https://anix.sh",
            quality: ["1080p", "720p"],
            logo: "https://anix.sh/img/favicon.png",
            isHardsubbed: false,
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
                            header: "Referer",
                            value: `${this.url}/`,
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    requestDomains: ["anix.sh"],
                },
            },
        ];
    }

    async search(query: string, anilist: AnilistSearchResponse): Promise<SearchResultType[]> {
        const response = await fetch(
            `${this.url}//filter?keyword=${encodeURIComponent(query)}`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                },
            }
        ).then((res) => res.text());

        const searchResponse = new AnivibeSearchResponse(response);

        return searchResponse.animes.map((anime) => ({
            id: anime.id,
            thumbnail: anime.poster,
            title: anime.poster,
        }) as SearchResultType);
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response = await fetch(`${this.url}${animeId}`, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        }).then((res) => res.text());

        const episodesResponse = new AnivibeEpisodesResponse(response);

        return episodesResponse.episodes.map((episode) => ({
            id: episode.id,
            number: episode.number.toString(),
        }) as EpisodeType);
    }

    async loadVideoServers(episodeId: string): Promise<VideoServerType[]> {
        const response = await fetch(`${this.url}${episodeId}`, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        }).then((res) => res.text());

        const serversResponse = new AnivibeServersResponse(response);

        return serversResponse.sub.map((source) => ({
            name: source.name,
            embed: source.embed,
        }) as VideoServerType);
    }

    async loadVideoContainer(videoServer: VideoServerType): Promise<VideoContainerType> {
        const extracted = await this.extractFromLink(videoServer.name, videoServer.embed);

        addRules(extracted.filter((v) => v.format !== VideoFormat.HLS).map((v) => {
            return {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Referer",
                            operation: "set",
                            value: this.url,
                        }
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
                    requestDomains: [new URL(v.file.url).hostname]
                }
            }
        }));

        return {
            videos: extracted,
        };
    }

    async extractFromLink(serverName: string, link: string): Promise<VideoType[]> {
        switch (serverName) {
            case "Vidstream":
                return new Promise((resolve) => {
                    resolve([{
                        file: { url: link },
                        format: VideoFormat.HLS,
                    }])
                });

            case "Vidhide":
                return await extractVidhide(link);
                
            case "Streamwish":
                return await extractStreamwish(link);
                
            case "Mp4upload":
                return await extractMP4Upload(link);
        }

        return [];
    }
}
