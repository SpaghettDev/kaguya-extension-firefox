import AnimeSource from "@src/core/AnimeSource";
import Episode, { EpisodeType } from "@src/core/Episode";
import FileUrl from "@src/core/FileUrl";
import SearchResult, { SearchResultType } from "@src/core/SearchResult";
import { SubtitleFormat, SubtitleType } from "@src/core/Subtitle";
import { VideoFormat } from "@src/core/Video";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { DataWithExtra } from "@src/types/utils";
import { parseNumberFromString } from "@src/utils";

declare module Bilibili {
    export interface Card {
        type: string;
        card_type: string;
        title: string;
        cover: string;
        view: string;
        styles: string;
        style_list: string[];
        season_id: string;
        episode_id: string;
        index_show: string;
        label: number;
        rank_info?: any;
        view_history?: any;
        watched: string;
        duration: string;
        view_at: string;
        pub_time_text: string;
        unavailable: boolean;
    }

    export interface Data {
        cards: Card[];
        total: number;
        size: number;
        num: number;
        has_next: boolean;
    }

    export interface ListResponse {
        code: number;
        message: string;
        ttl: number;
        data: ListData;
    }

    export interface ListData {
        has_next: number;
        list: List[];
        num: number;
        size: number;
        total: number;
    }

    export interface List {
        badge: string;
        badge_type: number;
        cover: string;
        index_show: string;
        is_finish: number;
        link: string;
        media_id: number;
        order: string;
        order_type: string;
        season_id: number;
        season_type: number;
        title: string;
        title_icon: string;
    }

    export interface Experiments {
        detail_experiment: string;
    }

    export interface UserStatus {
        progress?: any;
        like_state: number;
        favorite: number;
        vip: number;
    }

    export interface SubscribeGuide {
        text: string;
        alert_percent: number;
    }

    export interface Op {
        start_ms: number;
        end_ms: number;
    }

    export interface Ed {
        start_ms: number;
        end_ms: number;
    }

    export interface Jump {
        op: Op;
        ed: Ed;
    }

    export interface Button {
        title: string;
        uri: string;
    }

    export interface Dialog {
        type: number;
        title: string;
        button: Button;
    }

    export interface Subtitle {
        id: any;
        key: string;
        title: string;
        url: string;
        is_machine: boolean;
    }

    export interface Dimension {
        width: number;
        height: number;
        rotate: number;
    }

    export interface EpDetail {
        horizontal_cover: string;
        badge?: any;
        episode_id: number;
        title: string;
        short_title: string;
        long_title: string;
        long_title_display: string;
        status: number;
        jump: Jump;
        dialog: Dialog;
        subtitles: Subtitle[];
        dimension: Dimension;
    }

    export interface Section {
        title: string;
        style: string;
        ep_details: EpDetail[];
    }

    export interface Sections {
        title: string;
        ep_list_title: string;
        section: Section[];
    }

    export interface Info {
        union_info: string;
        play_num: string;
        tag?: any;
    }

    export interface Information {
        field: string;
        value: string;
    }

    export interface Style {
        id: number;
        title: string;
        uri: string;
    }

    export interface Styles {
        title: string;
        style: Style[];
    }

    export interface Desc {
        field: string;
        value: string;
    }

    export interface Details {
        vertical_cover: string;
        union_info: string[];
        information: Information[];
        styles: Styles;
        desc: Desc;
    }

    export interface Stat {
        views: string;
        reply: string;
        likes: string;
    }

    export interface SeasonSery {
        season_id: number;
        title: string;
    }

    export interface Identity {
        role: number;
        info: string;
        icon: string;
    }

    export interface Item {
        id: number;
        desc: string;
        icon_day: string;
        icon_night: string;
    }

    export interface ThreePoint {
        type: string;
        title: string;
        items: Item[];
    }

    export interface ItemDetail {
        aid: number;
        season_id: number;
        horizontal_cover: string;
        title: string;
        badge: string;
        union_info: string;
        track_id: string;
        duration: string;
        uri: string;
        goto_type: string;
        view: string;
        creator_head_img: string;
        creator_name: string;
        styles: string;
        update_progress: string;
        identity: Identity;
        tag?: any;
        three_points: ThreePoint[];
    }

    export interface ForYou {
        title: string;
        item_details: ItemDetail[];
    }

    export interface Data {
        experiments: Experiments;
        comment_restriction: string;
        no_comment: string;
        status: number;
        title: string;
        limit: string;
        update_desc: string;
        subtitle_suggest_key: string;
        season_id: number;
        open_skip_switch: boolean;
        allow_download: boolean;
        horizon_cover: string;
        episode_card_style: number;
        interactive_icons: string[];
        remind?: any;
        user_status: UserStatus;
        subscribe_guide: SubscribeGuide;
        sections: Sections;
        info: Info;
        details: Details;
        stat: Stat;
        season_series: SeasonSery[];
        related?: any;
        for_you: ForYou;
        dialog?: any;
        show_tags?: any;
    }

    export interface Anime {
        code: number;
        message: string;
        ttl: number;
        data: Data;
    }

    export interface Subtitle {
        url: string;
        lang: string;
        lang_key: string;
        subtitle_id: any;
    }

    export interface VideoSubtitle {
        lang: string;
        lang_key: string;
        srt: Srt;
        ass?: Ass;
    }

    export interface Srt {
        subtitle_id: number;
        url: string;
    }

    export interface Ass {
        subtitle_id: number;
        url: string;
    }

    export interface Data {
        subtitles: Subtitle[];
        video_subtitle: VideoSubtitle[];
    }

    export interface SubtitleResponse {
        code: number;
        message: string;
        ttl: number;
        data: Data;
    }
}

export default class Bilibili extends AnimeSource {
    constructor() {
        super({
            name: "Bilibili",
            id: "bilibili",
            languages: ["Tiếng Việt", "English"],
            isNSFW: false,
            url: "https://animehay.io",
            quality: ["720p"],
            logo: "https://animehay.io/themes/img/logo.png",
        });

        this.isHardsubbed = false;

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Referer",
                            operation: "set",
                            value: "https://app.biliintl.com",
                        },
                    ],
                },
                condition: {
                    regexFilter: "(.*)hdslb.com(.*)",
                    resourceTypes: ["image", "xmlhttprequest"],
                },
            },
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Referer",
                            operation: "set",
                            value: "https://www.bilibili.tv/",
                        },
                    ],
                },
                condition: {
                    regexFilter: "(.*)(bilivideo|mirrorakam.akamaized.net)(.*)",
                },
            },
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Referer",
                            operation: "set",
                            value: "https://www.bilibili.tv/",
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
                    requestDomains: ["s.bstarstatic.com"],
                },
            },
        ];
    }

    async getAnimeId(anilist: any): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const response = await fetch(
            `https://app.biliintl.com/intl/gateway/v2/ogv/view/app/season2?locale=en_US&platform=android&season_id=${animeId}`
        );
        const data = (await response.json()) as Bilibili.Anime;

        const episodes: EpisodeType[] = data.data.sections.section.flatMap(
            (section) => {
                return section.ep_details.map((ep) => {
                    const shortTitle = ep.short_title || ep.title;

                    return Episode({
                        id: ep.episode_id.toString(),
                        number: shortTitle.includes("PV")
                            ? shortTitle
                            : parseNumberFromString(
                                  shortTitle,
                                  ep.title
                              ).toString(),
                        title: ep.long_title,
                        thumbnail: ep.horizontal_cover,
                    });
                });
            }
        );

        return episodes;
    }

    async loadVideoServers(episodeId: string): Promise<VideoServerType[]> {
        return [{ name: "default", embed: "", extraData: { episodeId } }];
    }

    async loadVideoContainer(
        _: VideoServerType,
        extraData?: Record<string, string>
    ): Promise<VideoContainerType> {
        if (!extraData?.episodeId) return;

        const videoContainer = VideoContainer({
            videos: [],
            subtitles: [],
            timestamps: [],
        });

        //* Use third party API
        const response = await fetch(
            `https://weebsync.kaguya.app/server/bilibili/${extraData.episodeId}?official=true`
        );
        const json = await response.json();

        const url = json?.sources?.[0]?.file;

        if (!url) return videoContainer;

        const subtitles: SubtitleType[] = json?.subtitles?.map((subtitle) => {
            const subtitleFormat = subtitle?.file.includes(".ass")
                ? SubtitleFormat.ASS
                : SubtitleFormat.VTT;

            return {
                language: subtitle.language,
                format: subtitleFormat,
                file: FileUrl({ url: subtitle.file }),
            };
        });

        videoContainer.subtitles = subtitles;
        videoContainer.videos.push({ file: { url }, format: VideoFormat.DASH });

        try {
            const timestampResponse = await fetch(
                `https://api.bilibili.tv/intl/gateway/web/v2/ogv/play/episode?s_locale=en_US&platform=web&episode_id=${extraData.episodeId}`
            );

            const timestampData = (await timestampResponse.json()) as {
                code: number;
                message: string;
                ttl: number;
                data: {
                    skip: {
                        opening_start_time: number;
                        opening_end_time: number;
                        ending_start_time: number;
                        ending_end_time: number;
                    };
                };
            };

            const skipData = timestampData?.data?.skip;

            if (skipData) {
                if (
                    skipData?.opening_start_time &&
                    skipData?.opening_start_time
                ) {
                    videoContainer.timestamps.push({
                        type: "Intro",
                        startTime: skipData.opening_start_time / 1000,
                        endTime: skipData.opening_end_time / 1000,
                    });
                }

                if (skipData?.ending_start_time && skipData?.ending_end_time) {
                    videoContainer.timestamps.push({
                        type: "Outro",
                        startTime: skipData.ending_start_time / 1000,
                        endTime: skipData.ending_end_time / 1000,
                    });
                }
            }
        } catch (err) {
            console.log("[Bilibili] Failed to get timpstamps");
        }

        return videoContainer;

        //* Scrape directly
        // const response = await fetch(
        //   `https://api.bilibili.tv/intl/gateway/web/playurl?s_locale=en_US&platform=web&ep_id=${extraData?.episodeId}&qn=64&type=0&device=wap&tf=0&spm_id=bstar-web.pgc-video-detail.0.0&from_spm_id=bstar-web.pgc-video-detail.episode.all`
        // );
        // const data = await response.json();

        // if (!data?.data?.playurl) return VideoContainer({ videos: [] });

        // const dash = bilibiliExtractor(data.data.playurl);

        // if (!dash) return VideoContainer({ videos: [] });

        // const url = await createBlobUrlFromString(dash);

        // if (!url) return VideoContainer({ videos: [] });

        // const subtitles = await this.getSubtitles(extraData?.episodeId);

        // return VideoContainer({
        //   videos: [{ file: { url }, format: VideoFormat.DASH }],
        //   subtitles,
        // });
    }

    async search(query: string): Promise<SearchResultType[]> {
        try {
            const response = await fetch(
                `https://app.biliintl.com/intl/gateway/v2/app/search/type?keyword=${query}&type=7`
            );
            const json = await response.json();

            if (!json?.data?.items) return [];

            return json.data.items.map((item) => {
                return SearchResult({
                    id: item.season_id,
                    title: removeHtmlTags(item.title),
                    thumbnail: item.cover,
                });
            });
        } catch (err) {
            return [];
        }
    }

    // async getSubtitles(episodeId: string) {
    //   const response = await fetch(
    //     `https://api.bilibili.tv/intl/gateway/web/v2/subtitle?s_locale=en_US&platform=web&episode_id=${episodeId}&spm_id=bstar-web.pgc-video-detail.0.0&from_spm_id=bstar-web.pgc-video-detail.episode.all`
    //   );
    //   const data = await response.json();

    //   const originalSubtitles = data?.data?.video_subtitle;

    //   if (!originalSubtitles?.length) return [];

    //   const subtitlePromises: Promise<SubtitleType>[] = originalSubtitles
    //     .map(async (videoSubtitle) => {
    //       if (videoSubtitle?.ass?.url) {
    //         return Subtitle({
    //           file: FileUrl({ url: videoSubtitle.ass.url }),
    //           language: videoSubtitle.lang,
    //           format: SubtitleFormat.ASS,
    //         });
    //       }

    //       const response = await fetch(videoSubtitle?.srt?.url);
    //       const json = await response.json();

    //       const vtt = this.convertToVTT(json);

    //       const url = await createBlobUrlFromString(vtt);

    //       if (!url) return null;

    //       return Subtitle({
    //         file: { url },
    //         language: videoSubtitle.lang,
    //         format: SubtitleFormat.VTT,
    //       });
    //     })
    //     .filter(Boolean);

    //   const subtitles = await Promise.all(subtitlePromises);

    //   return subtitles;
    // }

    // convertToVTT(jsonData: any) {
    //   const builder = new SubtitleBuilder();

    //   jsonData.body.map((subtitle) => {
    //     builder.add(subtitle.from, subtitle.to, subtitle.content);
    //   });

    //   return builder.toString();
    // }
}

function removeHtmlTags(str: string): string {
    const regex = /(<([^>]+)>)/gi;
    return str.replace(regex, "");
}
