import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import FileUrl from "@src/core/FileUrl";
import { SearchResultType } from "@src/core/SearchResult";
import Subtitle, { SubtitleFormat, SubtitleType } from "@src/core/Subtitle";
import { VideoFormat } from "@src/core/Video";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { addRules } from "@src/utils/rules";

const servers = {
    4: "vidstreaming",
    1: "vidcloud",
    5: "streamsb",
    3: "streamtape",
};

const API_URL = "https://aniwatch-api-72oo.onrender.com";

export default class Zoro extends AnimeSource {
    constructor() {
        super({
            name: "Zoro",
            id: "zoro",
            languages: ["English"],
            isNSFW: false,
            url: "https://kaido.to",
            quality: ["1080p", "720p"],
            logo: "https://kaido.to/images/favicon.png?v=0.1",
        });

        this.isHardsubbed = false;
    }

    async search(query: string): Promise<SearchResultType[]> {
        if (!query) return [];

        if (query === "null") return [];

        const response = await fetch(
            `${API_URL}/anime/search?q=` + encodeURIComponent(query)
        );

        const data = (await response.json()) as {
            animes: {
                id: string;
                name: string;
                poster: string;
                duration: string;
                type: string;
                rating: string;
                episodes: {
                    sub: number;
                    dub: number;
                }[];
            }[];
        };

        return data?.animes?.map((item) => ({
            id: item.id,
            thumbnail: item.poster,
            title: item.name,
        }));
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response = await fetch(`${API_URL}/anime/episodes/` + animeId);

        const data = (await response.json()) as {
            episodes: {
                title: string;
                episodeId: string;
                number: number;
                isFiller: boolean;
            }[];
        };

        return data?.episodes?.map((ep) => ({
            id: ep.episodeId.replace("?ep=", "questionmarkep="),
            number: ep.number.toString(),
            title: ep.title,
            isFiller: ep.isFiller,
        }));
    }

    async loadVideoServers(
        episodeId: string,
        extraData?: Record<string, string>
    ): Promise<VideoServerType[]> {
        const newEpisodeId = episodeId.replace("questionmarkep=", "?ep=");

        const response = await fetch(
            `${API_URL}/anime/servers?episodeId=` + newEpisodeId
        );

        const data = (await response.json()) as {
            sub: {
                serverName: string;
                serverId: number;
            }[];
            dub: {
                serverName: string;
                serverId: number;
            }[];
            episodeId: string;
            episodeNo: number;
        };

        const subServers = data.sub.map((server) => {
            const serverName = servers[server.serverId] || "vidcloud";

            return {
                name: `sub-${serverName}`,
                embed: "",
                extraData: {
                    id: newEpisodeId,
                    serverName: serverName.toString(),
                    category: "sub",
                },
            };
        });

        const dubServers = data.dub.map((server) => {
            const serverName = servers[server.serverId] || "vidcloud";

            return {
                name: `dub-${serverName}`,
                embed: "",
                extraData: {
                    id: newEpisodeId,
                    serverName: serverName.toString(),
                    category: "dub",
                },
            };
        });

        return [...subServers, ...dubServers];
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const episodeId = videoServer.extraData.id!;
        const serverName = videoServer.extraData.serverName!;
        const category = videoServer.extraData.category!;

        const response = await fetch(
            `${API_URL}/anime/episode-srcs?id=${episodeId}&server=${serverName}&category=${category}`
        );

        const data = (await response.json()) as {
            tracks: { file: string; kind: string; label: string }[];
            intro: { start: number; end: number };
            outro: { start: number; end: number };
            sources: { url: string; type: string }[];
            anilistID: number;
            malID: number;
        };

        const container = VideoContainer({
            videos: [],
            subtitles: [],
            timestamps: [],
        });

        const subtitles: SubtitleType[] = data?.tracks
            ?.filter((track) => track.kind === "captions")
            .map((track) =>
                Subtitle({
                    file: { url: track.file },
                    language: track.label,
                })
            );

        container.subtitles = subtitles;

        if (data?.intro) {
            container.timestamps.push({
                type: "Intro",
                startTime: data.intro.start,
                endTime: data.intro.end,
            });
        }

        if (data?.outro) {
            container.timestamps.push({
                type: "Outro",
                startTime: data.outro.start,
                endTime: data.outro.end,
            });
        }

        if (Array.isArray(data?.sources)) {
            await addRules(
                data.sources.map((source) => {
                    return {
                        priority: 1,
                        action: {
                            type: "modifyHeaders",
                            requestHeaders: [
                                {
                                    header: "Referer",
                                    operation: "set",
                                    value: new URL(source.url).origin,
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
                            requestDomains: [new URL(source.url).hostname],
                        },
                    };
                })
            );

            data?.sources?.forEach((source) => {
                container.videos.push({
                    file: FileUrl({ url: source.url }),
                    format: source.type as VideoFormat,
                });
            });

            // container.videos.push({
            //   file: FileUrl({ url: data?.sources?.[0]?.url }),
            //   format: VideoFormat.HLS,
            // });
        }

        return container;
    }
}
