import AnimeSource from "@src/core/AnimeSource";
import { EpisodeType } from "@src/core/Episode";
import FileUrl from "@src/core/FileUrl";
import { SearchResultType } from "@src/core/SearchResult";
import Video, { VideoFormat, VideoType } from "@src/core/Video";
import VideoContainer, { VideoContainerType } from "@src/core/VideoContainer";
import VideoServer, { VideoServerType } from "@src/core/VideoServer";
import gogoExtractor from "@src/extractors/gogo";
import { AnilistSearchResponse } from "@src/models/Anilist";
import { DataWithExtra } from "@src/types/utils";
import { parseNumberFromString } from "@src/utils";
import { load } from "cheerio";

export default class Gogo extends AnimeSource {
    constructor() {
        super({
            name: "Gogo",
            id: "gogo",
            languages: ["English"],
            isNSFW: false,
            url: "https://anitaku.so",
            quality: ["720p"],
            logo: "https://cdn.gogocdn.net/files/gogo/img/favicon.ico",
        });
    }

    async search(query: string): Promise<SearchResultType[]> {
        const response = await fetch(
            `https://ajax.gogocdn.net/site/loadAjaxSearch?keyword=${encodeURIComponent(
                query
            )}&id=-1&link_web=http%3A%2F%2Fwww7.gogoanime.me%2F`
        );
        const json = await response.json();

        if (!json?.content) return [];

        const text = json.content;

        const $ = load(text);

        const searchResults: SearchResultType[] = $(".list_search_ajax")
            .toArray()
            .map((el) => {
                const $el = $(el);

                const id = $el.find("a").attr("href").split("/").pop().trim();
                const title = $el.text();

                const thumbnail = $el
                    .find(".thumbnail-recent_search")
                    .attr("style")
                    .match(/url\("(.*?)"/)[1];

                return {
                    id,
                    title,
                    thumbnail,
                };
            });

        return searchResults;
    }

    async getAnimeId(anilist: AnilistSearchResponse): Promise<DataWithExtra<string>> {
        const response = await fetch(
            `https://raw.githubusercontent.com/bal-mackup/mal-backup/master/anilist/anime/${anilist.id}.json`
        );
        const json = await response.json();

        const gogoMap: Record<string, string> = json?.Sites?.Gogoanime;

        if (!gogoMap) return;

        const gogoId = Object.keys(gogoMap)[0];

        return {
            data: gogoId,
        };
    }

    async loadEpisodes(animeId: string): Promise<EpisodeType[]> {
        const animeDetailsResponse = await fetch(
            `${this.url}/category/${animeId}`
        );
        const animeDetailsText = await animeDetailsResponse.text();

        const $animeDetails = load(animeDetailsText);

        const sourceAnimeId = $animeDetails("#movie_id").attr("value");

        if (!sourceAnimeId) return [];

        const response = await fetch(
            `https://ajax.gogocdn.net/ajax/load-list-episode?ep_start=0&ep_end=10000&id=${sourceAnimeId}`
        );
        const responseText = await response.text();

        const $ = load(responseText);

        const episodeList: EpisodeType[] = $("#episode_related li")
            .toArray()
            .map((el) => {
                const id = $(el).find("a").attr("href").trim().replace("/", "");

                const number = parseNumberFromString(
                    $(el).find(".name").text(),
                    "Full"
                ).toString();

                return {
                    id,
                    number,
                };
            });

        return episodeList.sort((a, b) => Number(a.number) - Number(b.number));
    }

    async loadVideoServers(episodeId: string): Promise<VideoServerType[]> {
        return [
            VideoServer({
                embed: "",
                name: "default",
                extraData: { episodeId },
            }),
        ];
    }

    async loadVideoContainer(
        videoServer: VideoServerType
    ): Promise<VideoContainerType> {
        const episodeId = videoServer?.extraData?.episodeId;

        if (!episodeId) return null;

        const extracted = await gogoExtractor(episodeId);

        if (extracted?.error) {
            console.error(extracted.error);
            return null;
        }

        const { Referer, sources, sources_bk } = extracted;

        const videos: VideoType[] = [...sources, ...sources_bk].map(
            (source) => {
                return Video({
                    file: FileUrl({
                        url: source.file,
                        headers: { referer: Referer },
                    }),
                    format: VideoFormat.CONTAINER,
                    quality: source.label,
                });
            }
        );

        if (!videos?.length) return null;

        return VideoContainer({ videos });
    }
}
