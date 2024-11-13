import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import { VideoFormat } from "@src/core/Video";
import { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import {
    AniPlayWatchResponse,
    AniPlayInfoProvider,
} from "@models/anime/aniplay";
import { TimestampType } from "@src/core/Timestamp";
import { AnilistSearchResponse } from "@src/models/Anilist";

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
            quality: ["1080p", "720p", "420p", "360p"],
            logo: "https://aniplaynow.live/favicon-16x16.png",
        });

        this.isHardsubbed = false;

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Origin",
                            operation: "remove",
                        },
                    ],
                },
                condition: {
                    requestDomains: ["aniplaynow.live"]
                }
            },
        ];
    }

    // aniplay itself uses anilist, and as such doesn't have a search endpoint
    async search(query: string, anilist: AnilistSearchResponse): Promise<SearchResultType[]> {
        return [{
            id: anilist.id.toString(),
            thumbnail: anilist.coverImage?.extraLarge
                ?? anilist.coverImage?.large
                ?? anilist.coverImage?.medium
                ?? "",
            title: anilist.title?.english ?? anilist.title?.romanji ?? anilist.title.native,
        }];
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response = await fetch(`${this.url}/anime/info/${animeId}`, {
            headers: {
                "Referer": `${this.url}/anime/info/${animeId}`,
                "Content-Type": "text/plain;charset=UTF-8",
                "Next-Action": HEADER_NEXT_ACTION_INFO
            },
            body: `[${animeId}, true, false]`,
            method: "POST"
        }).then((res) => res.text());

        const infoResp: AniPlayInfoProvider[] = JSON.parse(response.split("1:")[1]);

        return infoResp[0].episodes.map((episode) => ({
            id: episode.id,
            number: episode.number.toString(),
            title: episode.title,
            extra: {
                animeId: animeId,
                providerId: infoResp[0].providerId,
                epNum: episode.number.toString(),
            },
        }) as EpisodeType);
    }

    async loadVideoServers(episodeId: string, extra: Record<string, string>): Promise<VideoServerType[]> {
        const response = await fetch(
            `${this.url}/anime/watch/${extra.animeId}&ep=${extra.epNum}&host=${extra.providerId}&type=sub`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Next-Action": HEADER_NEXT_ACTION_WATCH
                },
                // 2nd element is actually MAL ID
                body: `["${extra.animeId}", "", "${extra.providerId}", "${episodeId}", "${extra.epNum}", "sub"]`,
                method: "POST"
            }
        ).then((res) => res.text());

        const watchResp: AniPlayWatchResponse = JSON.parse(response.split("1:")[1]);

        return watchResp.sources.map((source) => ({
            name: `${extra.providerId} - ${source.quality}`,
            embed: source.url,
            extraData: {
                providerId: extra.providerId,
                timestamps: JSON.stringify(
                    watchResp.skiptimes.filter((timestamp) =>
                        timestamp.startTime !== 0 && timestamp.endTime !== 0
                    ).map((timestamp) => ({
                        startTime: timestamp.startTime,
                        endTime: timestamp.endTime,
                        type: timestamp.text,
                    }) as TimestampType)
                )
            }
        }) as VideoServerType);
    }

    async loadVideoContainer(videoServer: VideoServerType): Promise<VideoContainerType> {
        return {
            videos: [{
                file: { url: videoServer.embed },
                quality: videoServer.extraData.providerId,
                format: VideoFormat.CONTAINER,
            }],
            timestamps: JSON.parse(videoServer.extraData.timestamps),
        };
    }
}
