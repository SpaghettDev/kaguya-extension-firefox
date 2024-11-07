enum PaheAnimeType {
    TV = "TV",
    SPECIAL = "Special",
    MOVIE = "Movie",
    OVA = "OVA",
    ONA = "ONA",
    MUSIC = "Music",
};

enum PaheSeason {
    FALL = "Fall",
    WINTER = "Winter",
    SPRING = "Spring",
    SUMMER = "Summer",
};

enum PaheAnimeStatus {
    FINISHED = "Finished Airing",
    AIRING = "Currently Airing",
    NOT_YET_AIRED = "Not yet aired",
};

enum PaheAudioType {
    ENGLISH = "eng",
    JAPAN = "jpn"
};

enum PaheDiscType {
    UNKNOWN = "",
    BD = "BD",
    DVD = "DVD"
};


/**
 * Interface for the episode type
 * returned by the /search endpoint
 */
interface PaheApiSearchEpisode {
    id: number;
    title: string;
    type: PaheAnimeType;
    episodes: number;
    status: PaheAnimeStatus;
    season: PaheSeason;
    year: number;
    score: number | null; // float
    poster: string;
    session: string;
};

/**
 * Interface for the episode type
 * returned by the /release endpoint
 */
interface PaheApiReleaseEpisode {
    id: number;
    anime_id: number;
    episode: number;
    episode2: number;
    eidition: string;
    title: string;
    snapshot: string;
    disc: PaheDiscType;
    audio: PaheAudioType;
    duration: string;
    session: string;
    filler: number;
    created_at: string;
};

/**
 * Interface for the /search endpoint
 */
interface PaheAPISearchResponse {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: Number;
    data: PaheApiSearchEpisode[];
};

/**
 * Interface for the /release endpoint
 */
interface PaheAPIReleaseResponse {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number;
    to: Number;
    data: PaheApiReleaseEpisode[];
};


export {
    PaheAnimeType, PaheSeason, PaheAnimeStatus,
    PaheAudioType, PaheDiscType,
    PaheApiSearchEpisode, PaheApiReleaseEpisode,
    PaheAPISearchResponse, PaheAPIReleaseResponse
};
