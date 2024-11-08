import Chapter, { ChapterType } from "@src/core/Chapter";
import { FileUrlType } from "@src/core/FileUrl";
import MangaSource from "@src/core/MangaSource";
import { SearchResultType } from "@src/core/SearchResult";
import { AnilistSearchResponse } from "@src/models/Anilist";
import { DataWithExtra } from "@src/types/utils";
import { parseNumberFromString } from "@src/utils";
import { load } from "cheerio";

export default class NetTruyen extends MangaSource {
    constructor() {
        super({
            name: "NetTruyen",
            id: "nettruyen",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: "https://www.nettruyenbb.com",
            logo: "https://st.nettruyenbb.com/data/logos/logo-nettruyen.png",
        });
    }

    async getMangaId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const search = async (title: string) => {
            const response = await fetch(
                `${this.url}/Comic/Services/SuggestSearch.ashx?q=${encodeURI(
                    title
                )}`
            );
            const text = await response.text();

            const $ = load(text);

            // https://www.nettruyenmax.com/truyen-tranh/co-gai-tu-ung-dung-nhan-tin-ngau-nhien-558323
            const item = $("li:first-child");
            const href = item.find("a").attr("href");
            const slug = href.split("/").filter(Boolean).pop();
            const id = slug.split("-").filter(Boolean).pop();

            return { id, slug };
        };

        if (!anilist?.title || !Object.keys(anilist?.title)?.length)
            return {
                data: null,
            };

        for (const [_, title] of Object.entries(anilist.title)) {
            const result = await search(title as string);

            if (!result) continue;

            return {
                data: result.id,
                extraData: {
                    slug: result.slug,
                },
            };
        }

        return { data: null };
    }

    async loadChapters(
        _: string,
        extraData?: Record<string, string>
    ): Promise<ChapterType[]> {
        if (!extraData?.slug) return [];

        const response = await fetch(
            `${this.url}/truyen-tranh/${extraData.slug}`
        );
        const text = await response.text();

        const $ = load(text);

        const chapters: ChapterType[] = $("div.chapter")
            .toArray()
            .map((el) => {
                const chapter = $(el).find("a");
                const number = parseNumberFromString(
                    chapter.text().trim(),
                    "Unknown"
                )?.toString();
                const id = chapter.data("id").toString();

                return Chapter({
                    id,
                    number,
                    extra: {
                        slug: extraData.slug,
                    },
                });
            });

        return chapters;
    }

    async loadImages(
        chapterId: string,
        extraData?: Record<string, string>
    ): Promise<FileUrlType[]> {
        if (!extraData?.slug) return [];

        try {
            const slugWithoutIdParts = extraData.slug.split("-");

            const slugWithoutId = slugWithoutIdParts
                .slice(0, slugWithoutIdParts.length - 1)
                .join("-");

            const response = await fetch(
                `${this.url}/truyen-tranh/${slugWithoutId}/chap-0/${chapterId}`
            );
            const text = await response.text();

            const $ = load(text);

            const images = $(".page-chapter");

            return images.toArray().map((el) => {
                const imageEl = $(el).find("img");
                const source = (imageEl.data("original") ||
                    imageEl.attr("src")) as string;

                const protocols = ["http", "https"];

                const image = protocols.some((protocol) =>
                    source.includes(protocol)
                )
                    ? source
                    : `https:${source}`;

                return {
                    url: image,
                    headers: {
                        referer: this.url,
                    },
                };
            });
        } catch (err) {
            return [];
        }
    }

    async search(title: string): Promise<SearchResultType[]> {
        const response = await fetch(
            `${this.url}/Comic/Services/SuggestSearch.ashx?q=${encodeURI(
                title
            )}`
        );

        const text = await response.text();

        const $ = load(text);

        const searchResults: SearchResultType[] = $("li")
            .toArray()
            .map((el) => {
                const item = $(el);

                const href = item.find("a").attr("href");
                const slug = href.split("/").filter(Boolean).pop();
                const id = slug.split("-").filter(Boolean).pop();
                const title = item.find("h3").text().trim();
                const thumbnail = item.find("img").attr("src");

                return {
                    id,
                    extra: { slug },
                    title,
                    thumbnail,
                };
            });

        return searchResults;
    }
}
