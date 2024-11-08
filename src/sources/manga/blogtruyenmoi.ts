import Chapter, { ChapterType } from "@src/core/Chapter";
import FileUrl, { FileUrlType } from "@src/core/FileUrl";
import MangaSource from "@src/core/MangaSource";
import { SearchResultType } from "@src/core/SearchResult";
import { AnilistSearchResponse } from "@src/models/Anilist";
import { DataWithExtra } from "@src/types/utils";
import { parseNumberFromString } from "@src/utils";
import { load } from "cheerio";

export default class BlogTruyenMoi extends MangaSource {
    constructor() {
        super({
            name: "BlogTruyenMoi",
            id: "blogtruyenmoi",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: "https://blogtruyenmoi.com",
            logo: "https://blogtruyen.vn/Content/logo.png",
        });

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "User-Agent",
                            operation: "set",
                            value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/100.0.0.0",
                        },
                    ],
                },
                condition: {
                    requestDomains: ["blogtruyenmoi.com"],
                },
            },
        ];
    }

    async getMangaId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const search = async (title: string) => {
            const response = await fetch(
                "https://blogtruyenmoi.com/ajax/Search/AjaxQuickSearch",
                {
                    body: `keyword=${encodeURIComponent(title)}`,
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                }
            );
            const text = await response.text();

            if (text.includes("Không tìm thấy")) {
                return null;
            }

            const $ = load(text);

            const item = $(".item-result:first-child");
            const id = item.data("id") as string;

            return id;
        };

        if (!anilist?.title || !Object.keys(anilist?.title)?.length)
            return {
                data: null,
            };

        for (const [_, title] of Object.entries(anilist.title)) {
            const id = await search(title as string);

            if (id) return { data: id };
        }

        return { data: null };
    }

    async loadChapters(mangaId: string): Promise<ChapterType[]> {
        const response = await fetch(`https://blogtruyenmoi.com/${mangaId}/`);
        const text = await response.text();

        const $ = load(text);

        const listChapters: ChapterType[] = $("#list-chapters p")
            .toArray()
            .map((el) => {
                const id = $(el).attr("id").replace("chapter-", "");

                const slug = $(el)
                    .find("a")
                    .attr("href")
                    .split("/")
                    .filter(Boolean)
                    .pop();

                const number = parseNumberFromString(
                    // SLug contains mangaId
                    slug.replace(mangaId, ""),
                    "Unknown"
                )?.toString();

                return Chapter({
                    id,
                    number,
                    extra: {
                        slug,
                    },
                });
            });

        return listChapters;
    }

    async loadImages(
        chapterId: string,
        extraData?: Record<string, string>
    ): Promise<FileUrlType[]> {
        if (!extraData?.slug) return [];

        const response = await fetch(
            `https://blogtruyenmoi.com/c${chapterId}/${extraData.slug}`
        );
        const text = await response.text();

        const $ = load(text);

        const images = $("article#content img")
            .toArray()
            .map((el) => {
                const imageEl = $(el);

                const src = imageEl.attr("src");

                return FileUrl({
                    url: src,
                    headers: {
                        referer: "https://blogtruyenmoi.com",
                    },
                });
            })
            .filter((image) => !image?.url?.includes("bannerblogtruyen1"));

        return images;
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response = await fetch(
            "https://blogtruyenmoi.com/ajax/Search/AjaxQuickSearch",
            {
                body: `keyword=${encodeURIComponent(query)}`,
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            }
        );

        const text = await response.text();

        if (text.includes("Không tìm thấy")) {
            return [];
        }

        const $ = load(text);

        const searchResults = $(".item-result")
            .toArray()
            .map((el) => {
                const item = $(el);

                const id = item.data("id") as string;
                const title = item.text().trim();
                const thumbnail = "";

                return {
                    id,
                    title,
                    thumbnail,
                };
            });

        return searchResults;
    }
}
