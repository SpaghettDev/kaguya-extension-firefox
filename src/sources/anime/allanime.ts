import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import { VideoContainerType } from "@src/core/VideoContainer";
import { VideoType } from "@src/core/Video";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import {
    AllAnimeEpisodesResponse, AllAnimeSearchResponse,
    AllAnimeSourcesResponse, AllAnimeVersionResponse,
    AllAnimeEpisodeInfosResponse,
} from "@models/anime/allanime";
import { AnilistSearchResponse } from "@src/models/Anilist";
import {
    decryptAllAnime,
    extractAllAnime, extractAllAnimeGogo,
} from "@src/extractors/allanime";
import {
    extractDoodstream, extractFilemoon,
    extractMP4Upload, extractOkRU,
    extractStreamwish,
} from "@src/extractors/common";
import { addRules } from "@src/utils/rules";

export default class AllAnime extends AnimeSource {
    readonly apiURL = "https://api.allanime.day/api";

    constructor() {
        super({
            name: "AllAnime",
            id: "allanime",
            languages: ["English"],
            isNSFW: false,
            url: "https://allanime.to/anime",
            quality: ["1080p", "720p", "420p", "360p", "180p"],
            logo: "https://allmanga.to/apple-touch-icon.png",
            isHardsubbed: false,
        });
    }

    async search(query: string): Promise<SearchResultType[]> {
        const searchResponse: AllAnimeSearchResponse = await fetch(this.apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: {
                    search: {
                        query,
                        allowAdult: false,
                        allowUnknown: false,
                    },
                    limit: 26,
                    page: 1,
                    translationType: "sub",
                    countryOrigin: "ALL",
                },
                query: `query(
    $search: SearchInput
    $limit: Int
    $page: Int
    $translationType: VaildTranslationTypeEnumType
    $countryOrigin: VaildCountryOriginEnumType
) {
    shows(
        search: $search
        limit: $limit
        page: $page
        translationType: $translationType
        countryOrigin: $countryOrigin
    ) {
        pageInfo {
            total
        }
        edges {
            _id
            name
            thumbnail
            englishName
            nativeName
            slugTime
        }
    }
}`
            }),
        }).then((res) => res.json());

        if (!searchResponse?.data?.shows?.edges?.length) return [];

        return searchResponse.data.shows.edges.map((item) => ({
            id: item._id.toString(),
            thumbnail: item.thumbnail,
            title: item.englishName ?? item.name,
        }) as SearchResultType);
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response: AllAnimeEpisodesResponse = await fetch(this.apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: {
                    _id: animeId.split("<&sep>")[0],
                },
                query: `query ($_id: String!) {
    show(
        _id: $_id
    ) {
        _id
        availableEpisodesDetail
    }
}`
            }),
        }).then((res) => res.json());

        const epInfosResponse: AllAnimeEpisodeInfosResponse = await fetch(this.apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: {
                    showId: response.data.show._id,
                    max: response.data.show.availableEpisodesDetail.sub.length,
                },
                query: `query($showId: String!, $max: Float!) {
    episodeInfos(showId:$showId, episodeNumStart:0, episodeNumEnd:$max){
        _id
        thumbnails
        episodeIdNum
        vidInforssub
        notes
        description
    }
}`
            }),
        }).then((res) => res.json());

        return epInfosResponse.data.episodeInfos.map((episode) => ({
            id: episode.episodeIdNum.toString(),
            number: episode.episodeIdNum.toString(),
            description: episode.description ?? "",
            title: episode.notes ?? `Episode ${episode.episodeIdNum}`,
            thumbnail: this.getThumbnailLink(episode.thumbnails),
            extra: {
                animeId,
            }
        }) as EpisodeType);
    }

    async loadVideoServers(
        episodeId: string,
        extra: Record<string, string>
    ): Promise<VideoServerType[]> {
        const response: AllAnimeSourcesResponse = await fetch(this.apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: {
                    showId: extra.animeId,
                    translationType: "sub",
                    episodeString: episodeId,
                },
                query: `query(
    $showId: String!,
    $translationType: VaildTranslationTypeEnumType!,
    $episodeString: String!
) {
    episode(
        showId: $showId
        translationType: $translationType
        episodeString: $episodeString
    ) {
        sourceUrls
    }
}`
            }),
        }).then((res) => res.json());

        const versionResponse: AllAnimeVersionResponse = await fetch(
            "https://allanime.to/getVersion"
        ).then((res) => res.json());

        response.data.episode.sourceUrls.map(async (source) => {
            if (source.sourceUrl.startsWith("--")) {
                const decrypted = decryptAllAnime("1234567890123456789", source.sourceUrl.split("--")[1]);

                source.sourceUrl = decrypted.startsWith("https://")
                    ? decrypted
                    : `${versionResponse.episodeIframeHead}${decrypted.replace("clock", "clock.json")}`;
            }

            return source;
        });

        return response.data.episode.sourceUrls.map((source) => ({
            name: source.sourceName,
            embed: source.sourceUrl,
        }) as VideoServerType);
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const container: VideoContainerType = {
            videos: [],
            subtitles: [],
        };

        const extracted = await this.extractFromLink(videoServer.embed);

        container.videos.push(...extracted);

        if (container.videos.length) {
            await addRules(container.videos.map((v) => {
                return {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        requestHeaders: Object.entries(v.file.headers).map(([name, value]) => {
                            return {
                                header: name,
                                operation: "set",
                                value: value,
                            };
                        }),
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
        }

        return container;
    }

    getThumbnailLink(links: string[]): string {
        if (!links)
            return "";

        // prefer the ones with domain, since the ones without one are kinda ass
        const linkWithDomain = links.find((v) => v.startsWith("https://"));
        if (!linkWithDomain) {
            const link = links.find((v) => v.startsWith("/"));

            return link ? `https://wp.youtube-anime.com/aln.youtube-anime.com${link}` : "";
        }

        return linkWithDomain;
    }

    async extractFromLink(link: string): Promise<VideoType[]> {
        const arrayIncludesString = (array: string[], str: string) => array.some((v) => str.includes(v));

        if (link.includes("/apivtwo/")) {
            return await extractAllAnime(link);
        } else if (link.includes("mp4upload.com")) {
            return await extractMP4Upload(link);
        } else if (arrayIncludesString([
            "vidstreaming", "https://gogo", "playgo1.cc",
            "playtaku", "vidcloud", "playtaku.net",
            "goone.pro", "embtaku", "s3taku"
        ], link)) {
            return await extractAllAnimeGogo(link);
        } else if (arrayIncludesString(["dood", "d0"], link)) {
            return await extractDoodstream(link);
        } else if (arrayIncludesString(["ok.ru", "okru"], link)) {
            return await extractOkRU(link);
        } else if (link.includes("filemoon")) {
            return await extractFilemoon(link);
        } else if (link.includes("streamwish")) {
            return await extractStreamwish(link);
        } else if (arrayIncludesString(["sbembed.com", "watchsb.com", "streamsb.net", "sbplay.org"], link)) {
            // ??? literally redirected me to a porn website
        }

        return [];
    }
}
