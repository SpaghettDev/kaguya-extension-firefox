import Chapter, { ChapterType } from "@src/core/Chapter";
import FileUrl, { FileUrlType } from "@src/core/FileUrl";
import MangaSource from "@src/core/MangaSource";
import { SearchResultType } from "@src/core/SearchResult";
import { DataWithExtra } from "@src/types/utils";
import { parseBetween, parseNumberFromString } from "@src/utils";
import { load } from "cheerio";

export default class MangaKatana extends MangaSource {
    constructor() {
        super({
            name: "MangaKatana",
            id: "mangakatana",
            languages: ["English"],
            isNSFW: false,
            url: "https://mangakatana.com",
            logo: "https://mangakatana.com/static/img/fav.png",
        });

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Referer",
                            operation: "set",
                            value: "https://mangadex.org",
                        },
                    ],
                    responseHeaders: [
                        {
                            header: "Access-Control-Allow-Origin",
                            operation: "set",
                            value: "*",
                        },
                        {
                            header: "Access-Control-Allow-Methods",
                            operation: "set",
                            value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                        },
                    ],
                },
                condition: {
                    regexFilter: "mangadex.org/covers",
                    resourceTypes: ["xmlhttprequest", "image"],
                },
            },
        ];
    }

    async getMangaId(anilist: any): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadChapters(mangaId: string): Promise<ChapterType[]> {
        const response = await fetch(
            `https://mangakatana.com/manga/${mangaId}`
        );

        const text = await response.text();

        const $ = load(text);

        const tr = $('.uk-table tr[data-jump="0"]');

        const chapters = tr.toArray().map((el) => {
            const chapterUrl = $(el).find(".chapter a").attr("href");
            const chapterIdArr = chapterUrl.split("/").filter(Boolean);
            const chapterId = chapterIdArr.pop();

            const chapterTitle = $(el).find(".chapter a").text();

            const chapterNumber = parseNumberFromString(
                chapterId,
                "Unknown"
            )?.toString();

            return Chapter({
                id: chapterId,
                number: chapterNumber,
                title: chapterTitle,
                extra: {
                    mangaId,
                },
            });
        });

        return chapters;
    }

    async loadImages(
        chapterId: string,
        extra: Record<string, string>
    ): Promise<FileUrlType[]> {
        if (!extra?.mangaId) return [];

        try {
            const response = await fetch(
                `https://mangakatana.com/manga/${extra.mangaId}/${chapterId}`
            );
            const text = await response.text();

            const imagesString =
                "[" + parseBetween(text, "var thzq=[", ",]") + "]";

            const images: string[] = JSON.parse(
                imagesString.replaceAll("'", '"')
            );

            return images.map((image) => FileUrl({ url: image }));
        } catch (err) {
            console.log(err);

            return [];
        }
    }

    async search(query: string): Promise<SearchResultType[]> {
        const headersList = {
            Accept: "*/*",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/100.0.0.0Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/x-www-form-urlencoded",
        };

        const bodyContent = `s=${encodeURIComponent(
            query
        )}&search_by=book_name`;

        const response = await fetch("https://mangakatana.com/", {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        });
        const text = await response.text();

        const $ = load(text);

        const searchResults: SearchResultType[] = $(".item")
            .toArray()
            .map((el) => {
                const imageUrl = $(el).find("img").attr("src");
                const title = $(el).find(".title").text();
                const mangaId = $(el)
                    .find(".title")
                    .attr("href")
                    .split("/")
                    .pop();

                return {
                    id: mangaId,
                    thumbnail: imageUrl,
                    title,
                };
            });

        return searchResults;
    }
}
