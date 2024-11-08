import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import { SearchResultType } from "@src/core/SearchResult";
import { VideoFormat } from "@src/core/Video";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import { VideoServerType } from "@src/core/VideoServer";
import { AnilistSearchResponse } from "@src/models/Anilist";
import { DataWithExtra } from "@src/types/utils";
import { parseBetween, parseNumberFromString } from "@src/utils";
import { load } from "cheerio";
import CryptoJS from "crypto-js";

const allowedServers = ["2", "3", "4", "9"];
// ['Fa', Lo', 'Fe', 'Wa']

const BASE_URL = "https://anime47.biz";

export default class Anime47 extends AnimeSource {
    constructor() {
        super({
            name: "Anime47",
            id: "anime47",
            languages: ["Tiếng Việt"],
            isNSFW: false,
            url: BASE_URL,
            quality: ["720p"],
            logo: `${BASE_URL}/favicon.ico`,
        });

        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
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
                    requestHeaders: [
                        {
                            header: "Referer",
                            value: BASE_URL,
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    regexFilter: "(.*)animevui.com(.*)",
                },
            },
        ];
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const searchResults = await this.totalSearch(anilist);

        return {
            data: searchResults?.[0]?.id,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const dataResponse = await fetch(
            `${BASE_URL}/phim/tomodachi-game/m${animeId}.html`
        );
        const data = await dataResponse.text();
        const $ = load(data);

        // /xem-phim-jujutsu-kaisen-2nd-season-ep-01/197339.html
        const watchUrl = $("#btn-film-watch.btn-red")
            .attr("href")
            .replace(".", "");

        const watchDataResponse = await fetch(BASE_URL + watchUrl);
        const watchData = await watchDataResponse.text();
        const $watch = load(watchData);

        const episodeSections = $watch(".server .name span")
            .toArray()
            .map((el) => $(el).text().trim());

        const episodesChunk = $watch(".server .episodes").toArray();

        const episodes: EpisodeType[] = episodesChunk.flatMap(
            (chunk, index) => {
                const section = episodeSections[index];

                return $(chunk)
                    .find("li a")
                    .toArray()
                    .map((el) => {
                        return {
                            number: parseNumberFromString(
                                $(el).text().trim(),
                                "Full"
                            ).toString(),
                            id: $(el).data("episode-id").toString(),
                            section,
                        };
                    });
            }
        );

        return episodes;
    }

    async loadVideoServers(episodeId: string): Promise<VideoServerType[]> {
        const response = await fetch(
            `${BASE_URL}/xem-phim-a-ep-a/${episodeId}.html`
        );

        const data = await response.text();
        const $ = load(data);

        const servers: VideoServerType[] = $("#clicksv span")
            .toArray()
            .map((el) => {
                const server = $(el);

                return {
                    name: server.text(),
                    extraData: {
                        id: server.attr("id").replace("sv", ""),
                        episodeId,
                    },
                    embed: "",
                };
            });

        return servers.filter((server) =>
            allowedServers.includes(server?.extraData?.id)
        );
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const { id, episodeId } = videoServer.extraData;

        const response = await fetch(`${BASE_URL}/player/player.php`, {
            method: "POST",
            body: `ID=${episodeId}&SV=${id}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data = await response.text();

        if (!data) return VideoContainer({ videos: [] });

        // Fa
        if (id === "2") {
            const videoUrl = decrypt(parseBetween(data, 'atob("', '")'));

            if (!videoUrl) return VideoContainer({ videos: [] });

            return VideoContainer({ videos: [{ file: { url: videoUrl } }] });
        }

        // Fe
        if (id === "4") {
            const videoUrl = decrypt(parseBetween(data, 'atob("', '")'));

            if (!videoUrl) return VideoContainer({ videos: [] });

            return VideoContainer({
                videos: [{ file: { url: videoUrl }, format: VideoFormat.HLS }],
            });
        }

        // Wa
        if (id === "9") {
            const videoUrl = decrypt(parseBetween(data, 'atob("', '")'));

            if (!videoUrl) return VideoContainer({ videos: [] });

            return VideoContainer({ videos: [{ file: { url: videoUrl } }] });
        }

        // Lo
        if (id === "3") {
            if (data.includes("thanhhoa")) {
                const videoUrl = decrypt(parseBetween(data, 'atob("', '")'));

                if (!videoUrl) return VideoContainer({ videos: [] });

                return VideoContainer({
                    videos: [{ file: { url: videoUrl } }],
                });
            }

            const iframeUrl = parseBetween(data, 'src=\\"', '\\"').replace(
                /\\\//g,
                "/"
            );

            const iframeResponse = await fetch(iframeUrl);
            const iframeData = await iframeResponse.text();

            const videoUrl = parseBetween(iframeData, '.setup({"file": "', '"');

            return VideoContainer({ videos: [{ file: { url: videoUrl } }] });
        }

        return VideoContainer({ videos: [] });
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response = await fetch(`${BASE_URL}/post_search.php`, {
            body: `ajaxSearch=1&keysearch=${encodeURIComponent(query)}`,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data = await response.text();

        const $ = load(data);

        const searchResults: SearchResultType[] = $("li:not(.ss-bottom)")
            .toArray()
            .map((el) => {
                const $el = $(el);

                const thumbnail = $el
                    .find("a")
                    .attr("style")
                    .match(/url\(["']?(.*?)["']?\)/)?.[1];

                // /phim/mushoku-tensei-ii-isekai-ittara-honki-dasu/m9079.html
                const id = parseIdFromUrl($el.find("a").attr("href"));

                const titles = parseTitle($el.find("p:first-of-type").text());

                const title = (() => {
                    const vietnameseTitle = titles.find((title) =>
                        isVietnamese(title)
                    );

                    return vietnameseTitle || titles[0];
                })();

                return {
                    id,
                    thumbnail,
                    title,
                };
            });

        return searchResults;
    }
}

const stringify = function (cipherParams: CryptoJS.lib.CipherParams) {
    const j = {
        ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
        iv: "",
        s: "",
    };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j);
};

const parse = function (jsonStr: string) {
    const j = JSON.parse(jsonStr);
    const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
};

const format = {
    stringify,
    parse,
};

const decrypt = (base64Key: string) => {
    const decodedKey = decodeBase64(base64Key);

    return JSON.parse(
        CryptoJS.AES.decrypt(decodedKey, "caphedaklak", { format }).toString(
            CryptoJS.enc.Utf8
        )
    );
};

const decodeBase64 = (string: string) => {
    return atob(string);
};

function parseIdFromUrl(url: string): string | null {
    const regex = /\/m(\d+)\.html$/;
    const match = url?.match(regex);

    if (match?.[1]) {
        return match[1];
    }

    return null;
}

function parseTitle(title: string, separators = ["|", ",", ";", "-", "/"]) {
    let mostOccuredSeparator = {
        occurTime: 0,
        separator: separators[0],
    };

    for (const separator of separators) {
        const occurTime = title.split(separator).length - 1;

        if (occurTime > mostOccuredSeparator.occurTime) {
            mostOccuredSeparator = {
                occurTime,
                separator,
            };
        }
    }

    const regex = new RegExp(`\\${mostOccuredSeparator.separator}\\s+`);

    return title
        .split(regex)
        .map((title) => title.trim())
        .filter((title) => title);
}

const isVietnamese = (text: string) => {
    const REGEX =
        /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ|đ/g;

    return REGEX.test(text.toLowerCase());
};
