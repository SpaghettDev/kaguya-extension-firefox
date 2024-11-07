interface SudatchiPropsBase {
    page: string;
    query: {
        animeSlug?: string;
        slug?: string;
        episodeNumber?: string;
    };
    buildId: string;
    isFallback: boolean;
    isExperimentalCompile: boolean;
    gssp: boolean;
    locale: string;
    locales: string[];
    defaultLocale: string;
    scriptLoader: any[];
};

interface SudatchiProps extends SudatchiPropsBase {
    props: Props;
};

interface SudatchiStreamsProps extends SudatchiPropsBase {
    props: StreamsProps;
};

interface Props {
    pageProps: PageProps;
    __N_SSP: boolean;
};

interface StreamsProps {
    pageProps: StreamsPageProps;
    __N_SSP: boolean;
};

interface PageProps {
    locale: string;
    animeData: AnimeData;
    _nextI18Next: Object;
};

interface StreamsPageProps {
    _nextI18Next: Object;
    headers: {
        [x: string]: string
    };
    episodeData: EpisodeData;
};

interface AnimeDataBase {
    id: number;
    anilistId: number;
    titleRomanji: string;
    titleEnglish: string;
    titleJapanese: string;
    titleSpanish: string | null;
    titleFilipino: string | null;
    titleHindi: string | null;
    titleKorean: string | null;
    synonym: string;
    synopsis: string;
    slug: string;
    statusId: number;
    typeId: number;
    year: number;
    seasonId: number;
    totalEpisodes: number | "N/A";
    seasonNumber: any;
    imgUrl: string;
    imgBanner: string;
    trailerLink: string;
    animeCrunchyId: string;
    crunchyrollId: string;
    hidiveId: any;
    seasonHidiveId: any;
    initialAirDate: string;
    isAdult: boolean;
    prequelId: any;
    sequelId: any;
    Status: {
        id: number;
        name: string;
    };
    Type: {
        id: number;
        name: string;
    };
};

interface AnimeData extends AnimeDataBase {
    Season: {
        id: number;
        name: string;
    };
    characters: Character[];
    AnimeGenres: AnimeGenre[];
    Episodes: Episode[];
    nextAirSchedule: NextAirSchedule;
};

interface EpisodeData {
    anime: {
        id: number;
        titleRomanji: string;
        titleEnglish: string;
        titleJapanese: string;
        synonym: string;
        synopsis: string;
        slug: string;
        year: number;
        isAdult: boolean;
        totalEpisodes: number;
        imgUrl: string;
        imgBanner: string;
        trailerLink: string;
        Type: {
            id: number;
            name: string;
        };
        Status: {
            id: number;
            name: string;
        };
        Season: {
            id: number;
            name: string;
        };
        AnimeGenres: {
            Genre: {
                id: number;
                name: string;
            };
        }[];
    };
    currentEpisode: string;
    episode: StreamsEpisode;
    episodes: StreamsEpisode[];
    previousEpisode: StreamsEpisode | null;
    nextEpisode: StreamsEpisode | null;
    servers: any[];
    subtitlesJson: string;
    subtitles: {
        id: number;
        name: string;
        language: string;
    }[];
    subtitlesMap: {
        [x: string]: string;
    };
    comments: any[];
    fonts: string[];
};

interface SudatchiAudioStream {
    id: number;
    episodeId: number;
    languageId: number;
    isDefault: boolean;
    autoSelect: boolean;
    playlistUri: string;
};

interface StreamsEpisode {
    id: number;
    title: string;
    number: number;
    imgUrl: string;
    animeId: number;
    isProcessed: boolean;
    openingStartsAt: number;
    openingEndsAt: number;
    _count: {
        EpisodeViews: number;
    };
    AudioStreams: SudatchiAudioStream[];
};

interface Character {
    id: number;
    anilistId: number;
    name: string;
    role: string;
    imageUrl: string;
    animeId: number;
    voiceActors: VoiceActor[];
};

interface VoiceActor {
    id: number;
    characterId: number;
    voiceActorId: number;
    voiceActor: VoiceActor2;
};

interface VoiceActor2 {
    id: number;
    anilistId: number;
    name: string;
    language: string;
    imageUrl: string;
};

interface AnimeGenre {
    animeId: number;
    genreId: number;
    Genre: {
        id: number;
        name: string;
    };
};

interface Episode {
    id: number;
    title: string;
    number: number;
    imgUrl: string;
    animeId: number;
    isProcessed: boolean;
    openingStartsAt?: number;
    openingEndsAt?: number;
    _count: {
        Subtitles: number;
        AudioStreams: number;
    }
    releaseDate: any;
    subtitleCount: number;
    audioCount: number;
};

interface NextAirSchedule {
    id: number;
    animeId: number;
    episodeId: any;
    episodeNumber: number;
    airDate: string;
};

interface SudatchiEpisodeSubtitle {
    id: number;
    episodeId: number;
    subtitleId: number;
    url: string;
    SubtitlesName: {
        id: number;
        name: string;
        language: string;
    };
};

/**
 * Interface for the anime type
 */
interface SudatchiAnime extends AnimeDataBase {};

/**
 * Interface for the /search endpoint
 */
interface SudathchiSearchResponse {
    animes: SudatchiAnime[];
    page: number;
    pages: number;
    genres: {
        id: number;
        name: string;
    }[];
    years: {
        year: number;
    }[];
    types: {
        id: number;
        name: string;
    }[];
    status: {
        id: number;
        name: string;
    }[];
    selectedGenres: any[];
    selectedYears: any[];
    selectedTypes: any[];
    selectedStatus: any[];
};

interface SudatchiStreamsResponse {
    url: string
};


export {
    SudatchiProps, SudatchiStreamsProps,
    SudathchiSearchResponse, SudatchiStreamsResponse,
    SudatchiEpisodeSubtitle,
};
