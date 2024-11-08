import { DataWithExtra } from "@src/types/utils";
import { EpisodeType } from "./Episode";
import Source, { SourceProps } from "./Source";
import { VideoContainerType } from "./VideoContainer";
import { VideoServerType } from "./VideoServer";
import { AnilistSearchResponse } from "@src/models/Anilist";

export interface AnimeSourceProps extends SourceProps {
    quality?: string[];
    isHardsubbed?: boolean;
}

export default class AnimeSource extends Source {
    quality: string[];
    isHardsubbed: boolean;

    constructor({ quality, ...props }: AnimeSourceProps) {
        super(props);

        this.quality = quality;

        // Decide if the source should load custom subtitles
        // If soft sub => load custom subtitles
        // If hard sub => don't load custom subtitles
        this.isHardsubbed = props.isHardsubbed ?? true;
    }

    /**
     * Retrieves the anime id based on the provided Anilist data.
     *
     * This function is responsible for returning the appropriate anime id, which will then be passed as a parameter to the `loadEpisodes` function.
     *
     * The anime id can be obtained by using the source's search function or by using any existing mapping.
     *
     */
    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        throw new Error("Method not implemented.");
    }

    async loadEpisodes(
        animeId: string,
        extraData?: Record<string, string>
    ): Promise<EpisodeType[]> {
        throw new Error("Method not implemented.");
    }

    async loadVideoServers(
        episodeId: string,
        extraData?: Record<string, string>
    ): Promise<VideoServerType[]> {
        throw new Error("Method not implemented.");
    }

    async loadVideoContainer(
        videoServer: VideoServerType,
        extraData?: Record<string, string>
    ): Promise<VideoContainerType> {
        throw new Error("Method not implemented.");
    }
}
