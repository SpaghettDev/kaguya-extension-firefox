import { parseBetween } from "@src/utils";
import { load } from "cheerio";

interface AnivibeSearchAnime {
    id: string;
    poster: string;
    title: string;
};

interface AnivibeEpisode {
    id: string;
    title: string;
    number: number;
};

interface AnivibeServer {
    name: string;
    embed: string;
    id: string | null;
};

interface AnivibeDefaultServer {
    id: number,
    type: "SUB" | "DUB";
    url: string;
    sub: string;
};


class AnivibeSearchResponse {
    animes: AnivibeSearchAnime[];

    constructor(html: string) {
        this.animes = [];

        const $ = load(html);

        $(".search-item a").each((_, el) => {
            const id = $(el).attr("href");
            const poster = $(el).find(".poster div img").attr("src");
            const title = $(el).find(".ani-detail .ani-name").data("en") as string;

            this.animes.push({
                id,
                poster,
                title,
            })
        });
    }
};

class AnivibeEpisodesResponse {
    episodes: AnivibeEpisode[];

    constructor(html: string) {
        this.episodes = [];

        const $ = load(html);

        $("#wrapper main .container .main-inner .content #ani-player-section #ani-episode .range-wrap .episodes .ep-range").each((_, el) => {
            $(el).find("div").each((_, ep_el) => {
                const $a = $(ep_el).find("a");
    
                const id = $a.attr("href");
                const number = Number($a.text().trim());
                const title = `Episode ${number}`;
    
                this.episodes.push({
                    id,
                    title,
                    number,
                });
            });
        });
    }
};

class AnivibeServersResponse {
    sub: AnivibeServer[];
    dub: AnivibeServer[];

    constructor(html: string) {
        this.sub = [];
        this.dub = [];

        const defaultServers: AnivibeDefaultServer[] = [];
        const $ = load(html);

        try {
            defaultServers.push(...JSON.parse(
                parseBetween(html, "loadIframePlayer('", "',")
            ));
        } catch (_) {}

        $("#wrapper main .container .main-inner .content #ani-player-section #ani-servers .ani-server-inner .ani-server-wrapper .ani-server-type").each((_, el) => {
            const type = $(el).data("type");

            $(el).find(".ani-server-type-pad .server").each((_, s_el) => {
                const name = $(s_el).find("div span").text().trim();
                let embed = $(s_el).data("video") as string;
                const id = $(s_el).data("id") as string ?? null;

                if (id && defaultServers.length) {
                    embed = defaultServers.find((s) => s.type === type)?.url ?? "";
                }

                switch (type) {
                    case "SUB":
                        this.sub.push({
                            name,
                            embed,
                            id,
                        })
                    break;

                    case "DUB":
                        this.dub.push({
                            name,
                            embed,
                            id,
                        });
                    break;
                }
            });
        });
    }
};


export {
    AnivibeSearchResponse, AnivibeEpisodesResponse,
    AnivibeServersResponse,
};
