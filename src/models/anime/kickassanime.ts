enum KickAssAnimeStatus {
    FINSIHED = "finished_airing",
    AIRING = "currently_airing",
    NOT_YET_AIRED = "not_yet_aired",
};

enum KickAssAnimeType {
    TV = "tv",
};

enum KickAssImageFormats {
    JPEG = "JPEG",
    WEBP = "webp",
};

enum KickAssLanguage {
    JA = "ja-JP",
    EN = "en-US",
    ES = "es-ES",
};

interface KickAssAnimePoster {
    formats: KickAssImageFormats[];
    sm: string;
    aspectRatio: number; // float
    hq: string
};

interface KickAssSearchResult {
    slug: string;
    start_date: string;
    status: KickAssAnimeStatus;
    title: string;
    title_en: string;
    type: KickAssAnimeType;
    year: number;
    poster: KickAssAnimePoster;
};

interface KickAssPage {
    number: number;
    from: string;
    to: string;
    eps: number[];
};

interface KickAssEpisodeThumbnail {
    formats: KickAssImageFormats[];
    sm: string;
    aspectRatio: number; // float
    hq: string;
};

interface KickAssEpisode {
    slug: string;
    title: string;
    episode_number: number;
    episode_string: string;
    thumbnail: KickAssEpisodeThumbnail;
};

interface KickAssEpisodesResponse {
    current_page: number;
    pages: KickAssPage[];
    result: KickAssEpisode[];
};

interface KickAssLanguageResponse {
    result: KickAssLanguage[];
};

interface KickAssEpisodeServer {
    name: string;
    shortName: string;
    src: string;
};

interface KickAssEpisodeResponse {
    title: string;
    title_en: string;
    synopsis: string;
    episode_title: string;
    episode_number: number;
    episode_string: string;
    language: KickAssLanguage;
    thumbnail: KickAssEpisodeThumbnail;
    poster: KickAssAnimePoster[];
    broadcast_day: string;
    broadcast_time: string;
    slug: string;
    show_slug: string;
    type: KickAssAnimeType;
    servers: KickAssEpisodeServer[];
    next_ep_slug?: string;
    prev_ep_slug?: string;
};


interface KickAssSourceResponse {
    data: string;
};

interface KickAssBirdSubtitle {
    filename: string;
    language: string;
    name: string;
    src: string;
};

interface KickAssBirdResponse {
    manifest: string;
    subtitles?: KickAssBirdSubtitle[] | null;
};

interface KickAssSourceSubtitles {
    language: string;
    name: string;
    src: string;
};

interface KickAssDecryptedSource {
    hls: string;
    key: string;
    preview: string;
    subtitles: KickAssSourceSubtitles[];
};


export {
    KickAssSourceResponse,
    KickAssBirdResponse,
    KickAssDecryptedSource,
    KickAssSearchResult,
    KickAssAnimePoster,
    KickAssEpisode,
    KickAssEpisodesResponse, KickAssLanguageResponse,
    KickAssEpisodeResponse,
    KickAssEpisodeServer,
};
