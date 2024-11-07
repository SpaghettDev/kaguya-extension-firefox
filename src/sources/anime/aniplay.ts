import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import SearchResult, { SearchResultType } from "@src/core/SearchResult";
import { VideoFormat } from "@src/core/Video";
import { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { AniPlayInfoProvider, AniPlaySource } from "@models/anime/aniplay";

const HEADER_NEXT_ACTION_INFO = "f3422af67c84852f5e63d50e1f51718f1c0225c4";
const HEADER_NEXT_ACTION_WATCH = "5dbcd21c7c276c4d15f8de29d9ef27aef5ea4a5e";

export default class Aniplay extends AnimeSource {
    constructor() {
        super({
            name: "Aniplay",
            id: "aniplay",
            languages: ["English"],
            isNSFW: false,
            url: "https://aniplaynow.live",
            quality: ["1080p", "720p", "360p", "420p"],
            logo: "https://aniplaynow.live/favicon-16x16.png",
        });

        this.isHardsubbed = false;
    }

    async search(query: string, anilist): Promise<SearchResultType[]> {
        const anilistResult = await fetch("https://graphql.anilist.co", {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
                "Content-Type": "application/json",
                "Origin": "https://aniplaynow.live",
                "Referer": "https://aniplaynow.live/"
            },
            body: JSON.stringify({
                "query": `
query ($type: MediaType, $search: String, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC], $isAdult: Boolean) {
    Page(perPage: 8) {
        pageInfo {
            total
            hasNextPage
        }
        results: media(type: $type, search: $search, sort: $sort, isAdult: $isAdult) {
            id
            title {
            romaji
            english
            }
            coverImage {
            medium
            }
            type
            format
            nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
            }
            episodes
            status
            averageScore
            genres
            startDate {
            year
            }
        }
    }
}`,
                "variables": {
                    "search": query,
                    "type": "ANIME",
                    "isAdult": false
                }
            }),
            method: "POST"
        }).then((res) => res.json());

        if (!anilistResult?.data?.length) return [];

        return anilistResult.data["data"]["Page"]["results"].map((item) => {
            return SearchResult({
                id: item.id,
                thumbnail: item.coverImage.medium,
                title: item.title.english,
            })
        })
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
        try {
            const searchResults = await this.totalSearch(anilist);
            const animeId = searchResults?.[0]?.id;
            return { data: animeId };
        } catch (error) {
            console.error("Error occurred while getting anime ID:", error);
            throw error;
        }
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const resp = await fetch(`https://aniplaynow.live/anime/info/${animeId}`, {
            headers: {
                "Referer": `https://aniplaynow.live/anime/info/${animeId}`,
                "Content-Type": "text/plain;charset=UTF-8",
                "Next-Action": HEADER_NEXT_ACTION_INFO
            },
            body: `[${animeId}, false, false]`,
            method: "POST"
        });
        const respText = await resp.text();

        const episodes: EpisodeType[] = [];

        let infoResp: AniPlayInfoProvider[] = JSON.parse(respText.split("1:")[1])

        for (const epInfo of infoResp[0].episodes) {
            episodes.push({
                id: epInfo.id,
                number: epInfo.number.toString(),
                title: epInfo.title,
                extra: {
                    animeId: animeId,
                    providerId: infoResp[0].providerId,
                    epNum: epInfo.number.toString(),
                }
            });
        }

        return episodes;

    }

    async loadVideoServers(episodeId: string, extra: Record<string, string>): Promise<VideoServerType[]> {
        const servers: VideoServerType[] = [];

        const resp2 = await fetch(
            `https://aniplaynow.live/anime/watch?id=${extra.animeId}&ep=${extra.epNum}&host=${extra.providerId}&type=sub`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Next-Action": HEADER_NEXT_ACTION_WATCH
                },
                body: `["${extra.animeId}", "${extra.providerId}", "${episodeId}", "${extra.epNum}", "sub"]`,
                method: "POST"
            }
        );

        const resp2Text = await resp2.text();
        const sources: AniPlaySource[] = JSON.parse(resp2Text.split("1:")[1])["sources"]

        for (const source of sources) {
            servers.push({
                name: source.quality,
                embed: source.url
            });
        }

        return servers;
    }

    async loadVideoContainer(videoServer: VideoServerType): Promise<VideoContainerType> {
        return { videos: [{
            file: { url: videoServer.embed },
            quality: videoServer.name,
            format: VideoFormat.CONTAINER
        }] };
    }
}
