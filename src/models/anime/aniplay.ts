type AniPlayQualityType = "360p"
    | "480p"
    | "720p"
    | "1080p"
    | "default"
    | "backup";

interface AniPlayEpisode {
    id: string;
    number: number;
    title: string;
    hasDub: boolean;
    isFiller: boolean;
    img: string;
    description: string;
    createdAt: string;
};

interface AniPlayInfoProvider {
    episodes: AniPlayEpisode[];
    providerId: string;
    default?: boolean;
};

interface AniPlaySource {
    url: string;
    isM3U8: boolean;
    quality: AniPlayQualityType;
};


export {
    AniPlayInfoProvider, AniPlaySource
};
