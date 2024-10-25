import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import { SubtitleFormat } from "@src/core/Subtitle";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { parseBetween } from "@src/utils";

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
        if (!query) return [];

        if (query === "null") return [];

        const encodedQuery = encodeURIComponent(query);

        const response = await fetch(
            `${this.url}/api/directory?page=1&genres=&years=&types=&status=&title=${encodedQuery}&category=`
        );

        const data = (await response.json()) as {
            animes: Array<{
                id: number;
                anilistId: number;
                titleRomanji: string;
                titleEnglish: string;
                titleJapanese: string;
                titleSpanish: any;
                titleFilipino: any;
                titleHindi: any;
                titleKorean: any;
                synonym: string;
                synopsis: string;
                slug: string;
                statusId: number;
                typeId: number;
                year: number;
                seasonId: number;
                totalEpisodes: number;
                seasonNumber: any;
                imgUrl: string;
                imgBanner: string;
                trailerLink: string;
                animeCrunchyId: string;
                crunchyrollId: string;
                hidiveId: any;
                seasonHidiveId: any;
                initialAirDate: string;
                isAdult: boolean;
                prequelId: any;
                sequelId: any;
                Type: {
                    id: number;
                    name: string;
                };
                Status: {
                    id: number;
                    name: string;
                };
            }>;
            page: number;
            pages: number;
            genres: Array<{
                id: number;
                name: string;
            }>;
            years: Array<{
                year: number;
            }>;
            types: Array<{
                id: number;
                name: string;
            }>;
            status: Array<{
                id: number;
                name: string;
            }>;
            selectedGenres: Array<any>;
            selectedYears: Array<any>;
            selectedTypes: Array<any>;
            selectedStatus: Array<any>;
        };

        if (!data?.animes?.length) return [];

        return data.animes.map((anime) => ({
            id: anime.slug,
            title:
                anime.titleEnglish || anime.titleRomanji || anime.titleJapanese,
            thumbnail: `https://ipfs.animeui.com/ipfs/${anime.imgUrl}`,
            extra: {
                anilistId: anime.anilistId.toString(),
            },
        }));
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
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

        const data = JSON.parse(props) as {
            props: {
                pageProps: {
                    animeData: {
                        id: number;
                        anilistId: number;
                        titleRomanji: string;
                        titleEnglish: string;
                        titleJapanese: string;
                        titleSpanish: any;
                        titleFilipino: any;
                        titleHindi: any;
                        titleKorean: any;
                        synonym: string;
                        synopsis: string;
                        slug: string;
                        statusId: number;
                        typeId: number;
                        year: number;
                        seasonId: number;
                        totalEpisodes: string;
                        seasonNumber: any;
                        imgUrl: string;
                        imgBanner: string;
                        trailerLink: string;
                        animeCrunchyId: string;
                        crunchyrollId: string;
                        hidiveId: any;
                        seasonHidiveId: any;
                        initialAirDate: string;
                        isAdult: boolean;
                        prequelId: any;
                        sequelId: any;
                        Status: {
                            id: number;
                            name: string;
                        };
                        Type: {
                            id: number;
                            name: string;
                        };
                        Season: {
                            id: number;
                            name: string;
                        };
                        characters: Array<{
                            id: number;
                            anilistId: number;
                            name: string;
                            role: string;
                            imageUrl: string;
                            animeId: number;
                            voiceActors: Array<{
                                id: number;
                                characterId: number;
                                voiceActorId: number;
                                voiceActor: {
                                    id: number;
                                    anilistId: number;
                                    name: string;
                                    language: string;
                                    imageUrl: string;
                                };
                            }>;
                        }>;
                        AnimeGenres: Array<{
                            animeId: number;
                            genreId: number;
                            Genre: {
                                id: number;
                                name: string;
                            };
                        }>;
                        Episodes: Array<{
                            id: number;
                            title: string;
                            number: number;
                            imgUrl: string;
                            animeId: number;
                            isProcessed: boolean;
                            openingStartsAt: number;
                            openingEndsAt: number;
                            _count: {
                                Subtitles: number;
                                AudioStreams: number;
                            };
                            releaseDate: any;
                            subtitleCount: number;
                            audioCount: number;
                        }>;
                        nextAirSchedule: {
                            id: number;
                            animeId: number;
                            episodeId: any;
                            episodeNumber: number;
                            airDate: string;
                        };
                    };
                };
            };
        };

        if (!data?.props?.pageProps?.animeData?.Episodes?.length) return [];

        const episodes = data.props.pageProps.animeData.Episodes;

        return episodes.map((episode) => ({
            id: `${animeId}-${episode.id}`,
            number: episode.number.toString(),
            extra: {
                number: episode.number.toString(),
                animeId,
                episodeId: episode.id.toString(),
            },
        }));
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

        const streamResponse = await fetch(
            `${this.url}/api/streams?episodeId=${episodeId}`
        );

        const json = (await streamResponse.json()) as { url: string };

        if (!json?.url) return container;

        container.videos.push({
            file: { url: `${this.url}/${json.url}` },
        });

        const response = await fetch(`${this.url}/watch/${animeId}/${number}`);

        const html = await response.text();

        const props = parseBetween(
            html,
            '<script id="__NEXT_DATA__" type="application/json">',
            "</script>"
        );

        if (!props) return container;

        const data = JSON.parse(props) as {
            props: {
                pageProps: {
                    episodeData: {
                        anime: {
                            id: number;
                            titleRomanji: string;
                            titleEnglish: string;
                            titleJapanese: string;
                            synonym: string;
                            synopsis: string;
                            slug: string;
                            year: number;
                            isAdult: boolean;
                            totalEpisodes: number;
                            imgUrl: string;
                            imgBanner: string;
                            trailerLink: string;
                            Type: {
                                id: number;
                                name: string;
                            };
                            Status: {
                                id: number;
                                name: string;
                            };
                            Season: {
                                id: number;
                                name: string;
                            };
                            AnimeGenres: Array<{
                                Genre: {
                                    id: number;
                                    name: string;
                                };
                            }>;
                        };
                        currentEpisode: string;
                        episode: {
                            id: number;
                            title: string;
                            number: number;
                            imgUrl: string;
                            animeId: number;
                            isProcessed: boolean;
                            openingStartsAt: number;
                            openingEndsAt: number;
                            _count: {
                                EpisodeViews: number;
                            };
                            AudioStreams: Array<{
                                id: number;
                                episodeId: number;
                                languageId: number;
                                isDefault: boolean;
                                autoSelect: boolean;
                                playlistUri: string;
                            }>;
                        };
                        episodes: Array<{
                            id: number;
                            title: string;
                            number: number;
                            imgUrl: string;
                            animeId: number;
                            isProcessed: boolean;
                            openingStartsAt: number;
                            openingEndsAt: number;
                            _count: {
                                EpisodeViews: number;
                            };
                            AudioStreams: Array<{
                                id: number;
                                episodeId: number;
                                languageId: number;
                                isDefault: boolean;
                                autoSelect: boolean;
                                playlistUri: string;
                            }>;
                        }>;
                        previousEpisode: any;
                        nextEpisode: any;
                        servers: Array<any>;
                        subtitlesJson: string;
                        subtitles: Array<{
                            id: number;
                            name: string;
                            language: string;
                        }>;
                        subtitlesMap: {
                            "1": string;
                            "2": string;
                            "4": string;
                            "6": string;
                        };
                        comments: Array<any>;
                        fonts: Array<string>;
                    };
                };
            };
        };

        if (!data) return container;

        const subtitles = JSON.parse(
            data?.props?.pageProps?.episodeData?.subtitlesJson
        ) as Array<{
            id: number;
            episodeId: number;
            subtitleId: number;
            url: string;
            SubtitlesName: {
                id: number;
                name: string;
                language: string;
            };
        }>;

        // const fonts = data?.props?.pageProps?.episodeData?.fonts;

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

        // Can't manage to make this work with Jassub
        // if (fonts?.length) {
        //   container.fonts = fonts.map((font) => {
        //     const fontName = font.split("/").pop().split(".")[0];

        //     return {
        //       file: { url: `${this.url}${font}` },
        //       name: fontName,
        //     };
        //   });
        // }

        container.fonts = [
            {
                file: {
                    url: `https://github.com/justrajdeep/fonts/raw/master/Arial.ttf`,
                },
                name: "Arial",
            },
            {
                file: {
                    url: `https://github.com/justrajdeep/fonts/raw/master/Arial%20Bold.ttf`,
                },
                name: "Arial",
            },
            {
                file: {
                    url: "https://github.com/justrajdeep/fonts/raw/master/Times%20New%20Roman.ttf",
                },
                name: "Times New Roman",
            },
            {
                file: {
                    url: "https://github.com/justrajdeep/fonts/raw/master/Trebuchet%20MS.ttf",
                },
                name: "Trebuchet MS",
            },
            {
                file: {
                    url: "https://github.com/justrajdeep/fonts/raw/master/Tahoma.ttf",
                },
                name: "Tahoma",
            },
            {
                file: {
                    url: "https://github.com/hoangvu12/kaguya-fonts/raw/master/AdobeArabic-Regular.ttf",
                },
                name: "Adobe Arabic",
            },
            {
                file: {
                    url: "https://github.com/hoangvu12/kaguya-fonts/raw/master/Swiss%20721%20BT.ttf",
                },
                name: "Swis721 BT",
            },
        ];

        return container;
    }

    async getSubtitleUrl() {
        const response = await fetch(
            "https://raw.githubusercontent.com/hoangvu12/kext-domain/master/domains.json"
        );
        const json = (await response.json()) as { [key: string]: string };

        if (!json?.["sudatchi-sub"]) return "";

        return json["sudatchi-sub"];
    }
}
