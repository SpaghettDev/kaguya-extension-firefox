import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { parseBetween } from "@src/utils";

export default class OPhim extends AnimeSource {
    constructor() {
        super({
            name: "OPhim",
            id: "ophim",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: "https://ophim.cc",
            quality: ["720p", "1080p"],
            logo: `a/themes/img/logo.png`,
        });
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
            extraData: searchResults?.[0]?.extra,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response = await fetch(`${this.url}/phim/${animeId}`);
        const text = await response.text();

        const props = parseBetween(
            text,
            '<script id="__NEXT_DATA__" type="application/json">',
            "</script>"
        );

        const json = JSON.parse(props) as {
            props: {
                pageProps: {
                    data: {
                        seoOnPage: {
                            og_type: string;
                            titleHead: string;
                            seoSchema: {
                                "@context": string;
                                "@type": string;
                                name: string;
                                dateModified: string;
                                dateCreated: string;
                                url: string;
                                datePublished: string;
                                image: string;
                                director: string;
                            };
                            descriptionHead: string;
                            og_image: Array<string>;
                            updated_time: number;
                            og_url: string;
                        };
                        breadCrumb: Array<{
                            name: string;
                            slug?: string;
                            position: number;
                            isCurrent?: boolean;
                        }>;
                        params: {
                            slug: string;
                        };
                        item: {
                            tmdb: {
                                type: any;
                                id: string;
                                season: any;
                                vote_average: number;
                                vote_count: number;
                            };
                            imdb: {
                                id: string;
                            };
                            created: {
                                time: string;
                            };
                            modified: {
                                time: string;
                            };
                            _id: string;
                            name: string;
                            origin_name: string;
                            content: string;
                            type: string;
                            status: string;
                            thumb_url: string;
                            poster_url: string;
                            is_copyright: boolean;
                            sub_docquyen: boolean;
                            chieurap: boolean;
                            trailer_url: string;
                            time: string;
                            episode_current: string;
                            episode_total: string;
                            quality: string;
                            lang: string;
                            notify: string;
                            showtimes: string;
                            slug: string;
                            year: number;
                            view: number;
                            actor: Array<string>;
                            director: Array<string>;
                            category: Array<{
                                id: string;
                                name: string;
                                slug: string;
                            }>;
                            country: Array<{
                                id: string;
                                name: string;
                                slug: string;
                            }>;
                            episodes: Array<{
                                server_name: string;
                                server_data: Array<{
                                    name: string;
                                    slug: string;
                                    filename: string;
                                    link_embed: string;
                                    link_m3u8: string;
                                }>;
                            }>;
                        };
                    };
                };
                __N_SSP: boolean;
            };
            page: string;
            query: {
                slug: string;
            };
            buildId: string;
            isFallback: boolean;
            gssp: boolean;
            scriptLoader: Array<any>;
        };

        const item = json?.props?.pageProps?.data?.item;

        if (!item?.episodes?.length) return [];

        return item?.episodes.flatMap((server) => {
            return server.server_data.map((episode) => {
                return {
                    id: `${animeId}-${slugify(server.server_name)}-${
                        episode.slug
                    }`,
                    number: episode.name,
                    section: server.server_name,
                    extra: {
                        stream: episode.link_m3u8,
                    },
                };
            });
        });
    }

    async loadVideoServers(
        _: string,
        extra: Record<string, string>
    ): Promise<VideoServerType[]> {
        return [
            {
                embed: "",
                name: "Server",
                extraData: extra,
            },
        ];
    }

    async loadVideoContainer(
        server: VideoServerType
    ): Promise<VideoContainerType> {
        return VideoContainer({
            videos: [{ file: { url: server.extraData.stream } }],
        });
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response = await fetch(
            `${this.url}/tim-kiem?keyword=${encodeURIComponent(
                query
            ).replaceAll("%20", "+")}`
        );

        const text = await response.text();

        const props = parseBetween(
            text,
            '<script id="__NEXT_DATA__" type="application/json">',
            "</script>"
        );

        const json = JSON.parse(props) as {
            props: {
                pageProps: {
                    data: {
                        seoOnPage: {
                            og_type: string;
                            titleHead: string;
                            descriptionHead: string;
                            og_image: Array<string>;
                            og_url: string;
                        };
                        breadCrumb: Array<{
                            name: string;
                            isCurrent: boolean;
                            position: number;
                        }>;
                        titlePage: string;
                        items: Array<{
                            name: string;
                            origin_name: string;
                            slug: string;
                            type: string;
                            thumb_url: string;
                            poster_url: string;
                            sub_docquyen: boolean;
                            chieurap: boolean;
                            time: string;
                            episode_current: string;
                            quality: string;
                            lang: string;
                            year: number;
                            category: Array<{
                                id: string;
                                name: string;
                                slug: string;
                            }>;
                            country: Array<{
                                id: string;
                                name: string;
                                slug: string;
                            }>;
                            modified: {
                                user_id: string;
                                user_name: string;
                                time: string;
                            };
                            _id: string;
                        }>;
                        params: {
                            type_slug: string;
                            keyword: string;
                            filterCategory: Array<string>;
                            filterCountry: Array<string>;
                            filterYear: string;
                            filterType: string;
                            sortField: string;
                            sortType: string;
                            pagination: {
                                totalItems: number;
                                totalItemsPerPage: number;
                                currentPage: number;
                                pageRanges: number;
                            };
                        };
                        type_list: string;
                        APP_DOMAIN_FRONTEND: string;
                        APP_DOMAIN_CDN_IMAGE: string;
                    };
                };
                __N_SSP: boolean;
            };
            page: string;
            query: {
                keyword: string;
            };
            buildId: string;
            isFallback: boolean;
            gssp: boolean;
            scriptLoader: Array<any>;
        };

        const items = json?.props?.pageProps?.data?.items;

        if (!items?.length) return [];

        return items.map((item) => {
            const thumbnail = `http://img.ophim1.com/uploads/movies/${item.poster_url}`;

            return {
                id: item.slug,
                title: item.name || item.origin_name,
                thumbnail: `${this.url}/_next/image?url=${encodeURIComponent(
                    thumbnail
                )}&w=384&q=75`,
            };
        });
    }
}

const slugify = (text: string) => {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/&/g, "-and-")
        .replace(/[\s\W-]+/g, "-");
};
