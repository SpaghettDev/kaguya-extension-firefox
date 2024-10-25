import { ChapterType } from "@src/core/Chapter";
import { EpisodeType } from "@src/core/Episode";
import { FileUrlType } from "@src/core/FileUrl";
import MangaSource from "@src/core/MangaSource";
import { SearchResultType } from "@src/core/SearchResult";
import { DataWithExtra } from "@src/types/utils";

declare module MangaDexResponse {
    export interface Image {
        hash: string;
        data: string[];
        dataSaver: string[];
    }

    export interface ImageResponse {
        result: string;
        baseUrl: string;
        chapter: Image;
    }

    export interface Title {
        en: string;
    }

    export interface AltTitle {
        ko: string;
        en: string;
        "zh-ro": string;
        zh: string;
        ru: string;
        "es-la": string;
        ja: string;
        "ko-ro": string;
        "ja-ro": string;
        vi: string;
        es: string;
        id: string;
        fr: string;
        "pt-br": string;
        ar: string;
        "zh-hk": string;
        uk: string;
        cs: string;
        pl: string;
        lt: string;
        fa: string;
        hi: string;
        ne: string;
        mn: string;
        tr: string;
        kk: string;
    }

    export interface Description {
        en: string;
        ru: string;
        zh: string;
        "pt-br": string;
        vi: string;
        es: string;
        tr: string;
        fr: string;
        ja: string;
        ko: string;
        th: string;
        "zh-hk": string;
        ar: string;
        id: string;
        it: string;
        kk: string;
        pl: string;
        uk: string;
    }

    export interface Links {
        engtl: string;
        ap: string;
        mu: string;
        nu: string;
        raw: string;
        al: string;
        bw: string;
        kt: string;
        amz: string;
        ebj: string;
        mal: string;
        cdj: string;
    }

    export interface Name {
        en: string;
    }

    export interface Tag {
        id: string;
        type: string;
        attributes: any;
        relationships: any[];
    }

    export interface Datum {
        id: string;
        type: string;
        attributes: any;
        relationships: Relationship[];
    }

    export interface SearchDatum {
        id: string;
        type: string;
        attributes: any;
        relationships: Relationship[];
    }

    export interface ChapterResponse {
        result: string;
        response: string;
        data: Datum[];
        limit: number;
        offset: number;
        total: number;
    }

    export interface SearchResponse {
        result: string;
        response: string;
        data: Datum[];
        limit: number;
        offset: number;
        total: number;
    }

    export interface Relationship {
        id: string;
        type: string;
        attributes?: any;
        related?: string;
    }

    export interface Description2 {}

    export interface Link {
        al?: string;
        mu: string;
        raw?: string;
        ap?: string;
        bw?: string;
        kt?: string;
        amz?: string;
        ebj?: string;
        mal?: string;
    }

    export interface Title {
        en: string;
    }
}

export default class MangaDexVN extends MangaSource {
    constructor() {
        super({
            name: "MangaDex VN",
            id: "mangadexvn",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: "https://mangadex.org",
            logo: "https://mangadex.org/favicon.ico",
        });
    }

    async getMangaId(anilist: any): Promise<DataWithExtra<string>> {
        const response = await fetch(
            `https://raw.githubusercontent.com/bal-mackup/mal-backup/master/anilist/manga/${anilist.id}.json`
        );
        const json = await response.json();

        const mangadex: Record<string, string> = json?.Sites?.Mangadex;

        if (!mangadex) return;

        const mangadexId = Object.keys(mangadex)[0];

        return {
            data: mangadexId,
        };
    }

    async loadChapters(mangaId: string): Promise<ChapterType[]> {
        const chapters = [];
        const LIMIT = 500;
        let time = 1;

        const get = async () => {
            const response = await fetch(
                `https://api.mangadex.org/manga/${mangaId}/feed?limit=${LIMIT}&order[volume]=desc&order[chapter]=desc&offset=${
                    (time - 1) * LIMIT
                }&translatedLanguage[]=vi&includes[]=scanlation_group`
            );
            const data =
                (await response.json()) as MangaDexResponse.ChapterResponse;

            if (!data?.data?.length) return [];

            const composedChapters: EpisodeType[] = [];

            for (const chapter of data.data) {
                if (
                    chapter?.attributes?.translatedLanguage !== "vi" ||
                    chapter?.attributes?.externalUrl !== null
                ) {
                    continue;
                }

                const group = chapter.relationships?.find(
                    (relationship) => relationship.type === "scanlation_group"
                );

                composedChapters.push({
                    id: chapter.id,
                    number: chapter.attributes.chapter || "Oneshot",
                    title: chapter.attributes.title,
                    section: group?.attributes?.name,
                });
            }

            chapters.push(...(composedChapters || []));

            if (time * LIMIT < data.total) {
                time++;

                return get();
            }
        };

        await get();

        return chapters;
    }

    async loadImages(chapterId: string): Promise<FileUrlType[]> {
        try {
            const response = await fetch(
                `https://api.mangadex.org//at-home/server/${chapterId}`
            );
            const data =
                (await response.json()) as MangaDexResponse.ImageResponse;

            if (!data?.chapter?.data?.length) return [];

            const images: FileUrlType[] = data.chapter.data.map((hash) => ({
                url: `${data.baseUrl}/data/${data.chapter.hash}/${hash}`,
                headers: {
                    referer: "https://mangadex.org/",
                },
            }));

            return images;
        } catch (err) {
            return [];
        }
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response = await fetch(
            `https://api.mangadex.org/manga?title=${encodeURIComponent(
                query
            )}&limit=50&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc`
        );
        const data = (await response.json()) as MangaDexResponse.SearchResponse;

        if (!data?.data?.length) return [];

        return data.data.map((manga) => {
            const coverArtRelationship = manga.relationships?.find(
                (relationship) => relationship.type === "cover_art"
            );

            const coverArtFileName = coverArtRelationship?.attributes?.fileName;
            const coverArtUrl = `https://mangadex.org/covers/${manga.id}/${coverArtFileName}`;

            const title = (() => {
                const titles = manga?.attributes
                    ?.title as MangaDexResponse.Title;

                const titlesKeys = Object.keys(titles);

                if (titles?.en) {
                    return titles?.en;
                }

                const altTitles = manga?.attributes
                    ?.altTitle as MangaDexResponse.AltTitle[];

                const enAltTitle = altTitles?.find((altTitle) => altTitle?.en);

                if (enAltTitle?.en) {
                    return enAltTitle?.en;
                }

                if (titles?.[titlesKeys?.[0]]) {
                    return titles[titlesKeys[0]];
                }

                const firstAltTitle = altTitles?.[0];
                const altTitlesKeys = Object.keys(firstAltTitle);

                return firstAltTitle[altTitlesKeys?.[0]];
            })();

            return {
                id: manga.id,
                title,
                thumbnail: coverArtUrl,
            };
        });
    }
}
