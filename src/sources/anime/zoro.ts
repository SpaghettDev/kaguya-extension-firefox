import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import { SubtitleType } from "@src/core/Subtitle";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { extractVariables, getSecret, decryptSource } from "@src/extractors/zoro";
import { DataWithExtra } from "@src/types/utils";
import { addRules } from "@src/utils/rules";
import {
    DecryptedEpisodeSource,
    EpisodeSourceResponse,
    EpisodeSourceResponseDecrypted,
    ZoroEpisodeServers,
    ZoroEpisodeServersResponse,
    ZoroEpisodeSourceResponse,
    ZoroEpisodesResponse,
    ZoroEpisodesResult,
    ZoroSearchResponse,
    ZoroSearchResult
} from "@models/anime/zoro";
import { AnilistSearchResponse } from "@src/models/Anilist";

const ZoroServerNames = {
    4: "vidstreaming",
    1: "vidcloud",
    5: "streamsb",
    3: "streamtape",
};

export default class Zoro extends AnimeSource {
    constructor() {
        super({
            name: "Zoro",
            id: "zoro",
            languages: ["English"],
            isNSFW: false,
            url: "https://hianime.to",
            quality: ["1080p", "720p"],
            logo: "https://hianime.to/images/icons-192.png",
        });

        this.isHardsubbed = false;
    }

    async search(query: string): Promise<SearchResultType[]> {
        if (!query) return [];

        if (query === "null") return [];

        const response: ZoroSearchResponse = await fetch(
            `${this.url}/ajax/search/suggest?keyword=${encodeURIComponent(query)}`, {
                headers: {
                    Referer: `${this.url}/search?keyword=${encodeURIComponent(query)}`,
                    Cookie: `userSettings=${encodeURIComponent(JSON.stringify(
                        {
                            "auto_play": 1,
                            "auto_next": 1,
                            "auto_skip_intro": 1,
                            "show_comments_at_home": 1,
                            "public_watch_list": 0,
                            // TODO: enable dubs later
                            "enable_dub": 0,
                            "anime_name": "en",
                            "play_original_audio": 0
                        }
                    ))}`
                },
            }
        ).then((res) => res.json());

        const zoroResp = new ZoroSearchResult(response);

        return zoroResp.animes.map((item) => ({
            id: item.id,
            thumbnail: item.poster,
            title: item.title
        } as SearchResultType));
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response: ZoroEpisodesResponse = await fetch(
            `${this.url}/ajax/v2/episode/list/${animeId}`
        ).then((res) => res.json());

        const zoroResp = new ZoroEpisodesResult(response);

        return zoroResp.episodes.map((ep) => ({
            id: ep.id,
            number: ep.number.toString(),
            title: ep.title,
        } as EpisodeType));
    }

    async loadVideoServers(
        episodeId: string,
        extraData?: Record<string, string>
    ): Promise<VideoServerType[]> {
        const response: ZoroEpisodeServersResponse = await fetch(
            `${this.url}/ajax/v2/episode/servers?episodeId=${episodeId}`
        ).then((res) => res.json());

        const zoroResp = new ZoroEpisodeServers(response);

        return [
            ...zoroResp.subServers,
            ...zoroResp.dubServers,
            ...zoroResp.rawServers
        ].map((server) => {
            const serverName = ZoroServerNames[server.serverId] || "vidcloud";

            return {
                name: `${server.type}-${serverName}`,
                embed: "",
                extraData: {
                    id: server.id,
                    serverName: serverName,
                    category: server.type,
                }
            } as VideoServerType;
        });
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const episodeId = videoServer.extraData.id!;

        const response: ZoroEpisodeSourceResponse = await fetch(
            `${this.url}/ajax/v2/episode/sources?id=${episodeId}`
        ).then((res) => res.json());
        const container = VideoContainer({
            videos: [],
            subtitles: [],
            timestamps: [],
        });

        const serverResponse: EpisodeSourceResponse = await fetch(
            this.getSourceLink(response.link)
        ).then((res) => res.json());

        const subtitles: SubtitleType[] = serverResponse?.tracks
            ?.filter(
                (track): track is {
                    file: string; label: string; default?: boolean; kind: "captions"
                } => track.kind === "captions"
            ).map((track) => ({
                file: { url: track.file },
                language: track.label,
            } as SubtitleType));

        container.subtitles = subtitles;

        if (serverResponse?.intro) {
            container.timestamps.push({
                type: "Intro",
                startTime: serverResponse.intro.start,
                endTime: serverResponse.intro.end,
            });
        }

        if (serverResponse?.outro) {
            container.timestamps.push({
                type: "Outro",
                startTime: serverResponse.outro.start,
                endTime: serverResponse.outro.end,
            });
        }

        let sources: DecryptedEpisodeSource[];

        if (serverResponse.encrypted) {
            const jsplayerScript = await fetch(
                this.getZoroJSPlayerUrl(response.link)
            ).then((res) => res.text());

            const variables = extractVariables(jsplayerScript);

            if (!variables.length) return null;

            const { secret, encryptedSource } = getSecret(
                serverResponse.sources, variables
            );

            const decrypted = decryptSource(encryptedSource, secret);

            sources = JSON.parse(decrypted);

            sources.forEach((source) => {
                container.videos.push({
                    file: { url: source.file },
                    format: source.type,
                });
            });
        } else {
            const resp = serverResponse as EpisodeSourceResponseDecrypted;

            sources = resp.sources.map((source) => ({
                file: source.url,
                type: source.type,
            } as DecryptedEpisodeSource));

            resp.sources.forEach((source) => {
                container.videos.push({
                    file: { url: source.url },
                    format: source.type,
                });
            });
        }

        await addRules(
            sources.map((source) => {
                return {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        requestHeaders: [
                            {
                                header: "Referer",
                                operation: "set",
                                value: new URL(source.file).origin,
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
                        requestDomains: [new URL(source.file).hostname],
                    }
                }
            })
        );

        return container;
    }

    getSourceLink(link: string): string {
        const linkURL = new URL(link);
        linkURL.search = "";

        const sourceLink = new URL(linkURL);

        const pathname = linkURL.pathname.split("/");

        pathname.splice(2, 0, "ajax");
        const id = pathname.splice(-1, 1, "getSources")[0];

        sourceLink.pathname = pathname.join("/");
        sourceLink.searchParams.append("id", id);

        return sourceLink.toString();
    }

    getZoroJSPlayerUrl(link: string): string {
        return `${
            (new URL(link)).origin
        }/js/player/a/prod/e1-player.min.js?v=${Date.now()}`;
    }
}
