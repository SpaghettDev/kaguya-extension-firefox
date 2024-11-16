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


export {
    AllAnimePageInfo, AllAnimeAnimeInfo,
    AllAnimeEpisodesInfo, AllAnimeSourceInfo,

    AllAnimeSearchResponse, AllAnimeEpisodeInfosResponse,
    AllAnimeEpisodesResponse, AllAnimeSourcesResponse,
    AllAnimeClockResponse, AllAnimeVersionResponse,
};
