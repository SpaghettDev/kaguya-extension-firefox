type Optional<T> = T | null;

type AnilistMediaType = "ANIME" | "MANGA";
type AnilistMediaFormat = "TV"
    | "TV_SHORT"
    | "MOVIE"
    | "SPECIAL"
    | "OVA"
    | "ONA"
    | "MUSIC"
    | "MANGA"
    | "NOVEL"
    | "ONE_SHOT";
type AnilistMediaStatus = "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS";
type AnilistMediaSeason = "WINTER"
    | "SPRING"
    | "SUMMER"
    | "FALL";


interface AnilistFuzzyDate {
    year?: Optional<number>;
    month?: Optional<number>;
    day?: Optional<number>;
};

interface AnilistImage {
    large?: Optional<string>;
    medium?: Optional<string>;
};

interface AnilistCoverImage extends AnilistImage {
    extraLarge?: Optional<string>;
    color: Optional<string>;
};

interface AnilistPageInfo {
    total: Optional<number>;
    perPage: Optional<number>;
    currentPage: Optional<number>;
    lastPage: Optional<number>;
    hasNextPage: boolean;
};

interface AnilistTag {
    id: number;
    name: string;
    description: string;
    category: string;
    rank: number;
    isGeneralSpoiler: boolean;
    isMediaSpoiler: boolean;
    isAdult: boolean;
    userId: number;
};

interface AnilistCharater {
    role: string;
    node: {
        id: number;
        image: AnilistImage;
        name: {
            first: string;
            middle: Optional<string>;
            last: Optional<string>;
            full: string;
            native: string;
            userPreferred: string;
        };
    };
};

interface AnilistStudioNode {
    id: number;
    name: string;
};

interface AnilistAiringScheduleNode {
    airingAt: number;
    episode: number;
};

interface AnilistTitleTranslation {
    locale: string;
    description: string;
    title: Optional<string>;
};


/**
 * Interface returned by the anilist API
 */
interface AnilistSearchResponse {
    id: number;
    idMal: number;
    title: {
        romanji: Optional<string>;
        english: Optional<string>;
        native: string;
        userPreferred: Optional<string>;
    };
    type: AnilistMediaType;
    format: AnilistMediaFormat;
    status: AnilistMediaStatus;
    description: string;
    startDate: Optional<AnilistFuzzyDate>;
    endDate: Optional<AnilistFuzzyDate>;
    season: AnilistMediaSeason;
    seasonYear: number;
    seasonInt: number;
    episodes: Optional<number>;
    duration: Optional<number>;
    chapters: Optional<number>;
    volumaes: Optional<number>;
    countryOfOrigin: string;
    updatedAt: number;
    coverImage: AnilistCoverImage;
    bannerImage: string;
    genres: string[];
    synonyms: string[];
    averageScore: number;
    popularity: number;
    trending: number;
    favourites: number;
    tags: AnilistTag[];
    relations: {
        nodes: object[];
        pageInfo: AnilistPageInfo;
    };
    characters: {
        edges: AnilistCharater[];
        pageInfo: AnilistPageInfo;
    };
    studios: {
        nodes: AnilistStudioNode[];
        pageInfo: AnilistPageInfo;
    };
    isAdult: boolean;
    recommendations: {
        nodes: object[];
        pageInfo: AnilistPageInfo;
    };
    airingSchedule: {
        nodes: AnilistAiringScheduleNode[];
    };
    mediaListEntry: Optional<object>;
    translations: AnilistTitleTranslation[];
};


export { AnilistSearchResponse };
