import AnimeSource from "@src/core/AnimeSource";

export default class Aniplay extends AnimeSource {
    constructor() {
        super({
            name: "Aniplay",
            id: "aniplay",
            languages: ["Italiano"],
            isNSFW: false,
            url: "https://aniplay.co",
            quality: ["1080p", "720p"],
            logo: "https://aniplay.co/favicon.ico?v=1.0.2",
        });

        this.isHardsubbed = false;
    }

    async search(query, anilist) {
        try {
            const response = await fetch(
                `https://aniplay.co/api/anime/advanced-search?page=0&size=36&query=${query}`
            );
            const data = await response.json();

            const matchingAnime = data.filter((anime) =>
                anime.listWebsites.some((website) =>
                    website.url.match(
                        new RegExp(
                            `https://anilist\\.co/anime/${anilist.id}(?![0-9])`
                        )
                    )
                )
            );

            const nonMatchingAnime = data.filter(
                (anime) =>
                    !anime.listWebsites.some((website) =>
                        website.url.match(
                            new RegExp(
                                `https://anilist\\.co/anime/${anilist.id}(?![0-9])`
                            )
                        )
                    )
            );

            const animeList = matchingAnime.map((item) => ({
                id: item.id.toString(),
                thumbnail: item.verticalImages[0].imageFull,
                title: item.title,
            }));

            return animeList.concat(
                nonMatchingAnime.map((item) => ({
                    id: item.id.toString(),
                    thumbnail: item.verticalImages[0].imageFull,
                    title: item.title,
                }))
            );
        } catch (error) {
            console.error("Error occurred during API request:", error);
            return [];
        }
    }

    async getAnimeId(anilist) {
        try {
            const searchResults = await this.totalSearch(anilist);
            const animeId = searchResults?.[0]?.id;
            return { data: animeId };
        } catch (error) {
            console.error("Error occurred while getting anime ID:", error);
            throw error;
        }
    }

    async loadEpisodes(animeId) {
        try {
            const apiUrl = `https://aniplay.co/api/anime/${animeId}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            let episodes = [];

            if (data && data.seasons && data.seasons.length > 0) {
                const seasonPromises = data.seasons.map(async (apiSeason) => {
                    try {
                        const seasonResponse = await fetch(
                            `${apiUrl}/season/${apiSeason.id}`
                        );
                        const seasonData = await seasonResponse.json();

                        if (
                            Array.isArray(seasonData) &&
                            seasonData.length > 0
                        ) {
                            seasonData
                                .filter(
                                    (apiEpisode) =>
                                        apiEpisode?.episodeNumber !== undefined
                                )
                                .forEach((apiEpisode) => {
                                    const number = parseInt(
                                        apiEpisode.episodeNumber,
                                        10
                                    );
                                    if (!isNaN(number)) {
                                        episodes.push({
                                            id: apiEpisode.id.toString(),
                                            number: number.toString(),
                                            title: apiEpisode.title,
                                            section: apiSeason.name,
                                            extra: { animeId: animeId },
                                        });
                                    }
                                });
                        }
                    } catch (error) {
                        console.error(
                            "Error occurred while fetching season data:",
                            error
                        );
                    }
                });

                await Promise.all(seasonPromises);
            } else if (data && data.episodes && data.episodes.length > 0) {
                data.episodes
                    .filter(
                        (apiEpisode) => apiEpisode?.episodeNumber !== undefined
                    )
                    .forEach((apiEpisode) => {
                        const number = parseInt(apiEpisode.episodeNumber, 10);
                        if (!isNaN(number)) {
                            episodes.push({
                                id: apiEpisode.id.toString(),
                                number: number.toString(),
                                title: apiEpisode.title,
                                extra: { animeId: animeId },
                            });
                        }
                    });
            }

            return episodes;
        } catch (error) {
            console.error("Error occurred during API request:", error);
            throw error;
        }
    }

    async loadVideoServers(episodeId) {
        try {
            const embedLink = `https://aniplay.co/api/episode/${episodeId}`;
            return [
                { embed: "", name: "default", extraData: { link: embedLink } },
            ];
        } catch (error) {
            console.error("Error loading video servers:", error);
            throw error;
        }
    }

    async loadVideoContainer(videoServer) {
        try {
            const { link } = videoServer.extraData;
            const response = await fetch(link);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return { videos: [{ file: { url: data.videoUrl } }] };
        } catch (error) {
            console.error("Error loading video container:", error);
            throw error;
        }
    }
}
