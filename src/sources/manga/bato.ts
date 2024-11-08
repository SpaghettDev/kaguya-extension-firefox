import Chapter, { ChapterType } from "@src/core/Chapter";
import { FileUrlType } from "@src/core/FileUrl";
import MangaSource from "@src/core/MangaSource";
import SearchResult, { SearchResultType } from "@src/core/SearchResult";
import { AnilistSearchResponse } from "@src/models/Anilist";
import { DataWithExtra } from "@src/types/utils";
import { parseBetween, parseNumberFromString } from "@src/utils";
import { evalScript } from "@src/utils/eval";
import { load } from "cheerio";
import CryptoJS from "crypto-js";

export default class Bato extends MangaSource {
    constructor() {
        super({
            name: "Bato",
            id: "bato",
            languages: ["English"],
            isNSFW: false,
            url: "https://bato.to",
            logo: "https://bato.to/public-assets/img/favicon.ico",
        });
    }

    async getMangaId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadChapters(mangaId: string): Promise<ChapterType[]> {
        const response = await fetch(`${this.url}/title/${mangaId}-a`);

        const text = await response.text();

        const $ = load(text);

        const chapterEls = $("[name=chapter-list] .px-2.py-2");

        const chapters = chapterEls.toArray().map((el) => {
            const wrapper = $(el).find(".space-x-1:first");

            const chapterUrl = wrapper.find("a").attr("href");
            const chapterIdArr = chapterUrl.split("/").filter(Boolean);
            const chapterId = chapterIdArr.pop().split("-")[0];

            const chapterTitle = wrapper.find("a").text();

            const chapterNumber = parseNumberFromString(
                chapterTitle.split("Chapter")[1],
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
            const response = await fetch(`${this.url}/chapter/${chapterId}`);
            const text = await response.text();

            const batoPass: string = await evalScript(
                parseBetween(text, "const batoPass = ", ";")
            );
            const batoWord = parseBetween(text, 'const batoWord = "', '";');

            console.log(batoWord, batoPass);

            const imgHttpList: string[] = await evalScript(
                parseBetween(text, "const imgHttpLis = ", ";")
            );
            const imgWordLis: string[] = JSON.parse(
                CryptoJS.AES.decrypt(batoWord, batoPass).toString(
                    CryptoJS.enc.Utf8
                )
            );

            const images: FileUrlType[] = imgHttpList.map(
                (imgHttp: string, index: number) => {
                    return {
                        url: `${imgHttp}?${imgWordLis[index]}`,
                    };
                }
            );

            return images;
        } catch (err) {
            console.log(err);

            return [];
        }
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response = await fetch(`${this.url}/apo/`, {
            method: "POST",
            body: JSON.stringify({
                query: "\n  query get_content_searchComic($select: SearchComic_Select) {\n    get_content_searchComic(\n      select: $select\n    ) {\n      reqPage reqSize reqSort reqWord\n      newPage\n      paging { \n  total pages page init size skip limit\n }\n      items {\n        id\n        data {\n          \nid\ndbStatus\nisNormal\nisHidden\nisDeleted\n\ndateCreate datePublic dateModify\ndateUpload dateUpdate\n\nname\nslug\naltNames\n\nauthors\nartists\ngenres\n\norigLang tranLang\n\nuploadStatus\noriginalStatus\n\noriginalPubFrom\noriginalPubTill\n\nreadDirection\n\nurlPath\n\nurlCover600\nurlCover300\nurlCoverOri\n\ndisqusId\n\n\n\nstat_is_hot\nstat_is_new\n\nstat_count_follows\nstat_count_reviews\nstat_count_post_child \nstat_count_post_reply\n\nstat_count_mylists\n\nstat_count_votes\nstat_count_notes\nstat_count_emotions {\n  field count\n}\nstat_count_statuss {\n  field count\n}\nstat_count_scores {\n  field count\n}\nstat_count_views {\n  field count\n}\n\nstat_score_avg\nstat_score_bay\nstat_score_val\n\nstat_count_chapters_normal\nstat_count_chapters_others\n\n\n\n          \n        }\n        \n        \n\n        \n        \n\n        \n    last_chapterNodes(amount:1) {\n      \n  id\n  data {\n    \n\n  id comicId\n\n  dbStatus\n  isNormal\n  isHidden\n  isDeleted\n  isFinal\n  \n  dateCreate\n  datePublic\n  dateModify\n\n  volNum\n  chaNum\n  dname\n  title\n  urlPath\n\n  count_images\n\n  stat_is_new\n\n  stat_count_post_child\n  stat_count_post_reply\n  stat_count_views_login\n  stat_count_views_guest\n  \n  userId\n  userNode {\n    \n  id \n  data {\n    \nid\nname\nuniq\navatarUrl \nurlPath\n\ndateCreate\ndateOnline\n\ngender \nbirth{y m d}\n\nstat_count_comics_normal\nstat_count_comics_others\n\nstat_count_comics_uploaded\nstat_count_comics_modified\n\nstat_count_chapters_normal\nstat_count_chapters_others\n\nstat_count_comment_createds\nstat_count_comment_receives\n\nstat_count_forum_child\nstat_count_forum_reply\n\nstat_count_views_guest\nstat_count_views_login\n\nstat_count_following\nstat_count_followers\n\nstat_warnings_unread\nstat_warnings_readed\n\ncount_reviews\n\nis_adm is_mod is_vip\nis_verified is_deleted\nis_trusted is_muted is_warned is_banned\n\n  }\n\n  }\n\n  }\n\n    }\n  \n\n        \n        \n      }\n    }\n  }\n  ",
                variables: {
                    select: { page: 1, size: 30, where: "browse", word: query },
                },
                operationName: "get_content_searchComic",
            }),
            headers: {
                "content-type": "application/json",
            },
        });

        const json = await response.json();

        const items = json?.data?.get_content_searchComic?.items;

        if (!items?.length) return [];

        const searchResults: SearchResultType[] = items.map((item) => {
            const data = item.data;

            const title = data.name;
            const id = data.id;
            const thumbnail = data.urlCoverOri;

            return SearchResult({ id, thumbnail, title });
        });

        return searchResults;
    }
}
