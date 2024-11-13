type Optional<T> = T | null;


interface AllAnimePageInfo {
    total: number;
};

interface AllAnimeAnimeInfo {
    _id: string;
    name: string;
    thumbnail: string;
    englishName: string;
    nativeName: string;
    slugTime: Optional<string>;
};

interface AllAnimeEpisodeInfo {
    _id: string;
    thumbnails: Optional<string[]>;
    episodeIdNum: number; // can be float
    vidInforssub: Optional<{
        vidResolution: number;
        vidPath: string;
        vidSize: number;
        vidDuration: number; // float
    }>;
    notes: Optional<string>;
    description: Optional<string>;
};

interface AllAnimeEpisodesInfo {
    _id: string;
    availableEpisodesDetail: {
        sub: string[];
        dub: string[];
        raw: string[];
    };
};

interface AllAnimeSourceInfo {
    sourceUrl: string;
    priority: number; // integer or float
    sourceName: string;
    type: "iframe" | "player";
    sandbox?: string;
    className: string;
    streamerId: string;
    downloads?: {
        sourceName: string;
        downloadUrl: string;
    };
};

interface AllAnimeSubtitle {
    label: string;
    src: string;
    lang: string;
};


interface AllAnimeSearchResponse {
    data: {
        shows: {
            pageInfo: AllAnimePageInfo;
            edges: AllAnimeAnimeInfo[];
        }
    };
};

interface AllAnimeEpisodesResponse {
    data: {
        show: AllAnimeEpisodesInfo;
    };
};

interface AllAnimeEpisodeInfosResponse {
    data: {
        episodeInfos: AllAnimeEpisodeInfo[];
    };
};

interface AllAnimeSourcesResponse {
    data: {
        episode: {
            sourceUrls: AllAnimeSourceInfo[];
        }
    };
};

interface AllAnimeClockResponse {
    links: {
        link: string;
        hls: boolean;
        mp4: boolean;
        resolutionStr: string;
        priority: number;
        subtitles?: AllAnimeSubtitle[];
        fromCache?: string;
    }[];
};

interface AllAnimeVersionResponse {
    data: string;
    episodeIframeHead: string;
};


interface AllAnimeOKVideoOptions {
    playerId: string;
    width: string;
    height: string;
    notifyEnabled: boolean;
    notifyMovieSubscription: boolean;
    url: string;
    url11: string;
    html5url: string;
    okVideoPlayerEnabled: boolean;
    minFlashVersionNewPlayer: string;
    wmode: string;
    asa: boolean;
    provider: string;
    flashvars: {
        relatedAlways: string;
        metadata: {
            provider: string;
            service: string;
            owner: boolean;
            voted: boolean;
            likeCount: number;
            subscribed: boolean;
            isWatchLater: boolean;
            slot: number;
            siteZone: number;
            showAd: boolean;
            fromTime: number;
            author: object;
            movie: object,
            admanMetadata: object;
            partnerId: number;
            ownerMovieId: string;
            alwaysShowRec: boolean;
            videos: {
                name: string;
                url: string;
                seekSchema: number;
                disallowed: boolean;
            }[];
            metadataUrl: string;
            hlsManifestUrl: string;
            failoverHosts: string[];
            autoplay: object;
            p2pInfo: object;
            stunServers: {
                urls: string[]
            }[];
        },
        saveLastPlayingTimeFrom: string;
        castId: string;
        noDownload: string;
        locale: string;
        noChatLikes: string;
        noChannel: string;
        webmSec: string;
        enabledLocalStorage: string;
        minCacheTime: string;
        maxCachePartOfDurationMQ: string;
        checkMQ: string;
        noTrailer: string;
        recSlot: string;
        noOldDash: string;
        noLikeButton: string;
        maxCachePartOfDuration: string;
        isAnonym: string;
        jidx: string;
        hideWatermark: string;
        isEmbed: string;
        noOkliveBanner: string;
        minCacheTimeMQ: string;
        ldChunk: string;
        showChat: string;
        ldBuffer: string;
        feedAdLogic: string;
        siteId: string;
        location: string;
        hideExpand: string;
        adLogic: string;
        checkAutoplayBrowsers: string;
    };
    liveRertyTimeout: number;
    poster: string;
    isExternalPlayer: boolean;
    isIframePlayer: boolean;
    isHtml5Player: boolean;
    timestamp: string;
    stubEnabled: boolean;
    verifyInline: boolean;
    webrtcBrokenH264: boolean;
    playerLocalizationEnabled: boolean;
};


export {
    AllAnimePageInfo, AllAnimeAnimeInfo,
    AllAnimeEpisodesInfo, AllAnimeSourceInfo,

    AllAnimeSearchResponse, AllAnimeEpisodeInfosResponse,
    AllAnimeEpisodesResponse, AllAnimeSourcesResponse,
    AllAnimeClockResponse, AllAnimeVersionResponse,

    AllAnimeOKVideoOptions,
};
