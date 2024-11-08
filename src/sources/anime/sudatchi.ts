import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import { SubtitleFormat } from "@src/core/Subtitle";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { parseBetween } from "@src/utils";
import {
    SudatchiEpisodeSubtitle,
    SudatchiProps, SudatchiStreamsProps,
    SudatchiStreamsResponse,
    SudathchiSearchResponse, 
} from "@models/anime/sudatchi";
import { AnilistSearchResponse } from "@src/models/Anilist";

export default class Sudatchi extends AnimeSource {
    constructor() {
        super({
            name: "Sudatchi",
            id: "sudatchi",
            languages: ["English"],
            isNSFW: false,
            url: "https://sudatchi.com",
            quality: ["1080p", "720p"],
            logo: "https://sudatchi.com/favicon.ico",
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
                            header: "Origin",
                            value: "https://sudatchi.com/",
                            operation: "set",
                        },
                        {
                            header: "Referer",
                            value: "https://sudatchi.com/",
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    regexFilter: "https://sudatchi.com/",
                    requestMethods: ["get"],
                    resourceTypes: ["xmlhttprequest"],
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
                    regexFilter: "https://github.com/",
                    requestMethods: ["get"],
                    resourceTypes: ["xmlhttprequest"],
                },
            },
        ];
    }

    async search(query: string): Promise<SearchResultType[]> {
        if (!query || query === "null") return [];

        const response: SudathchiSearchResponse = await fetch(
            `${this.url}/api/directory?title=${encodeURIComponent(query)}`
        ).then((res) => res.json());

        if (!response?.animes?.length) return [];

        return response.animes.map((anime) => ({
            id: anime.slug,
            title:
                anime.titleEnglish || anime.titleRomanji || anime.titleJapanese,
            thumbnail: `https://ipfs.animeui.com/ipfs/${anime.imgUrl}`,
            extra: {
                anilistId: anime.anilistId.toString(),
            },
        }));
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        const searchResultWithSameId = searchResults.find(
            (result) => Number(result.extra?.anilistId) === anilist.id
        );

        if (searchResultWithSameId) {
            return {
                data: searchResultWithSameId.id,
                extraData: searchResultWithSameId.extra,
            };
        }

        return {
            data: searchResults?.[0]?.id,
            extraData: searchResults?.[0]?.extra,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response = await fetch(`${this.url}/anime/${animeId}`);

        const html = await response.text();

        const props = parseBetween(
            html,
            '<script id="__NEXT_DATA__" type="application/json">',
            "</script>"
        );

        if (!props) return [];

        const data: SudatchiProps = JSON.parse(props);

        const episodes = data?.props?.pageProps?.animeData?.Episodes;

        if (!episodes) return [];

        return episodes.map((episode) => ({
            id: `${animeId}-${episode.id}`,
            number: episode.number.toString(),
            extra: {
                number: episode.number.toString(),
                animeId,
                episodeId: episode.id.toString(),
            },
        }) as EpisodeType);
    }

    async loadVideoServers(
        _: string,
        extraData?: Record<string, string>
    ): Promise<VideoServerType[]> {
        const number = extraData?.number;
        const animeId = extraData?.animeId;
        const episodeId = extraData?.episodeId;

        if (!number || !animeId) return [];

        return [
            {
                embed: "",
                name: "Server",
                extraData: {
                    number,
                    animeId,
                    episodeId,
                },
            },
        ];
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const number = videoServer?.extraData?.number;
        const animeId = videoServer?.extraData?.animeId;
        const episodeId = videoServer?.extraData?.episodeId;

        const container = VideoContainer({
            videos: [],
            fonts: [],
            subtitles: [],
            timestamps: [],
        });

        const streamResponse: SudatchiStreamsResponse = await fetch(
            `${this.url}/api/streams?episodeId=${episodeId}`
        ).then((res) => res.json());

        if (!streamResponse?.url) return container;

        container.videos.push({
            file: { url: `${this.url}/${streamResponse.url}` },
        });

        const response = await fetch(`${this.url}/watch/${animeId}/${number}`).then(
            (res) => res.text()
        );

        const props = parseBetween(
            response,
            '<script id="__NEXT_DATA__" type="application/json">',
            "</script>"
        );

        if (!props) return container;

        const data: SudatchiStreamsProps = JSON.parse(props);

        if (!data) return container;

        const subtitles: SudatchiEpisodeSubtitle[] = JSON.parse(
            data?.props?.pageProps?.episodeData?.subtitlesJson
        );
        const fonts = data?.props?.pageProps?.episodeData?.fonts;

        if (subtitles?.length) {
            const subtitleUrl = await this.getSubtitleUrl();

            container.subtitles = subtitles.map((sub) => {
                let url = "";

                if (sub.url.startsWith("/subtitles")) {
                    url = `https://sudatchi.com${sub.url}`;
                } else {
                    url = `${subtitleUrl}${sub.url}`;
                }

                return {
                    file: { url },
                    language: sub.SubtitlesName.name,
                    format: SubtitleFormat.ASS,
                };
            });
        }

        const openingStartsAt =
            data?.props?.pageProps?.episodeData?.episode.openingStartsAt;
        const openingEndsAt =
            data?.props?.pageProps?.episodeData?.episode.openingEndsAt;

        if (openingEndsAt && openingStartsAt) {
            container.timestamps = [
                {
                    startTime: openingStartsAt,
                    endTime: openingEndsAt,
                    type: "OP",
                },
            ];
        }

        if (fonts?.length) {
          container.fonts = fonts.map((font) => {
            const fontName = font.split("/").at(-1).split(".")[0];

            return {
                file: { url: `${this.url}${font}` },
                name: fontName,
            };
          });
        }

        return container;
    }

    async getSubtitleUrl() {
        const response = await fetch(
            "https://raw.githubusercontent.com/hoangvu12/kext-domain/master/domains.json"
        ).then((res) => res.json()) as { [key: string]: string };

        return response?.["sudatchi-sub"] ?? "";
    }
}
