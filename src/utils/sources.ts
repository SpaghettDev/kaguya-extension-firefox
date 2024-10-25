import { SourceProps } from "@src/core/Source";
import { anime, manga } from "@src/sources";

const composeSources = (sources: typeof anime | typeof manga) => {
    const composedSources: SourceProps[] = [];

    for (const [id, source] of Object.entries(sources)) {
        composedSources.push({
            id,
            isNSFW: source.isNSFW,
            languages: source.languages,
            logo: source.logo,
            name: source.name,
            url: source.url,
        });
    }

    return composedSources;
};

export const getAnimeSources = async () => {
    return composeSources(anime);
};

export const getMangaSources = async () => {
    return composeSources(manga);
};
