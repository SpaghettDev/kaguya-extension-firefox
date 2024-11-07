import { siteMatches } from "@src/constants";
import AnimeSource from "@src/core/AnimeSource";
import Source from "@src/core/Source";
import { anime, manga } from "@src/sources";
import { getDomainFromUrl } from "@src/utils";
import { onMessage, registerListener } from "@src/utils/events";
import { addRules, clearRules } from "@src/utils/rules";
import { getAnimeSources, getMangaSources } from "@src/utils/sources";
import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
reloadOnUpdate("pages/background");

// /**
//  * Extension reloading is necessary because the browser automatically caches the css.
//  * If you do not use the css of the content script, please delete it.
//  */
// reloadOnUpdate("pages/content/style.scss");

const rules: Omit<browser.declarativeNetRequest.Rule, "id">[] = [
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
        },
        condition: {
            requestDomains: ["cdn.discordapp.com", "media.discordapp.net"],
            requestMethods: ["get"],
        },
    },
    {
        priority: 1,
        action: {
            type: "modifyHeaders",
            requestHeaders: [
                {
                    header: "Origin",
                    operation: "remove",
                },
                {
                    header: "Referer",
                    operation: "remove",
                },
                {
                    header: "User-Agent",
                    operation: "remove",
                },
            ],
        },
        condition: {
            requestDomains: ["api.jikan.moe"],
            requestMethods: ["get"],
        },
    },
];

const updateRules = (source: Source) => {
    const globalRules: Omit<browser.declarativeNetRequest.Rule, "id">[] = rules;

    for (const rule of source?.rules || []) {
        globalRules.push(rule);
    }

    return addRules(globalRules);
};

const getAnimeSource = async (sourceId: string) => {
    if (!(sourceId in anime)) {
        return null;
    }

    return anime[sourceId];
};

const getMangaSource = async (sourceId: string) => {
    if (!(sourceId in manga)) {
        return null;
    }

    return manga[sourceId];
};

const initializeListeners = () => {
    onMessage("update-rules", async ({ fileUrls }) => {
        const requestHeaders: browser.declarativeNetRequest._RuleActionRequestHeaders[] = [];

        const domains: string[] = [];

        for (const fileUrl of fileUrls) {
            const headers = fileUrl.headers;

            if (!headers) continue;
            if (!Object.keys(headers)) continue;

            const domain = getDomainFromUrl(fileUrl.url);

            if (domain && !domains.includes(domain)) {
                domains.push(domain);
            }

            for (const [header, value] of Object.entries(headers)) {
                if (
                    requestHeaders.some(
                        (requestHeader) =>
                            requestHeader.header === header &&
                            requestHeader.value === value
                    )
                )
                    continue;

                requestHeaders.push({
                    header,
                    value,
                    operation: "set",
                });
            }
        }

        await addRules([
            {
                action: {
                    type: "modifyHeaders",
                    requestHeaders,
                },
                condition: {
                    requestDomains: domains,
                    resourceTypes: [
                        "xmlhttprequest",
                        "media",
                        "image",
                    ],
                },
            },
        ]);

        return true;
    });

    onMessage("search-anime", async (message) => {
        if (!message) {
            throw new Error("Invalid data");
        }

        const { anilist, sourceId, query } = message;

        const source: AnimeSource = await getAnimeSource(sourceId);

        await clearRules();
        await updateRules(source);

        const searchResults = await source.totalSearch(anilist, query);

        return searchResults;
    });

    onMessage("search-manga", async (message) => {
        if (!message) {
            throw new Error("Invalid data");
        }

        const { anilist, sourceId, query } = message;

        const source = await getMangaSource(sourceId);

        await clearRules();
        await updateRules(source);

        return source.totalSearch(anilist, query);
    });

    onMessage("get-anime-sources", async () => {
        const sources = await getAnimeSources();

        return sources;
    });

    onMessage("get-manga-sources", async () => {
        const sources = await getMangaSources();

        return sources;
    });

    onMessage("get-anime-id", async (message) => {
        if (!message) {
            throw new Error("Invalid data");
        }

        const { anilist, sourceId } = message;

        const source: AnimeSource = await getAnimeSource(sourceId);

        const animeId = await source.getAnimeId(anilist);

        return animeId;
    });

    onMessage("get-episodes", async (message) => {
        if (!message) {
            throw new Error("Invalid data");
        }

        const { animeId, extraData, sourceId } = message;

        const source: AnimeSource = await getAnimeSource(sourceId);

        await clearRules();
        await updateRules(source);

        const episodes = await source.loadEpisodes(animeId, extraData);

        return episodes;
    });

    onMessage("get-video-servers", async (message) => {
        if (!message) {
            throw new Error("Invalid data");
        }

        const { episodeId, sourceId, extraData } = message;

        const source: AnimeSource = await getAnimeSource(sourceId);

        const videoServers = await source.loadVideoServers(
            episodeId,
            extraData
        );

        return videoServers;
    });

    onMessage("get-video-container", async (message) => {
        if (!message) {
            throw new Error("Invalid data");
        }

        const { videoServer, extraData, sourceId } = message;

        const source: AnimeSource = await getAnimeSource(sourceId);

        const videoContainer = await source.loadVideoContainer(
            videoServer,
            extraData
        );

        return videoContainer;
    });

    onMessage("get-manga-id", async (message) => {
        if (!message) {
            throw new Error("Invalid data");
        }

        const { anilist, sourceId } = message;

        const source = await getMangaSource(sourceId);

        return source.getMangaId(anilist);
    });

    onMessage("get-chapters", async (message) => {
        if (!message) {
            throw new Error("Invalid data");
        }

        const { mangaId, extraData, sourceId } = message;

        const source = await getMangaSource(sourceId);

        await clearRules();
        await updateRules(source);

        return source.loadChapters(mangaId, extraData);
    });

    onMessage("get-images", async (message) => {
        if (!message) {
            throw new Error("Invalid data");
        }

        const { chapterId, sourceId, extraData } = message;

        const source = await getMangaSource(sourceId);

        return source.loadImages(chapterId, extraData);
    });
};

const registerMessageIntermediate = () => {
    const targetJSURL = "https://kaguya.app/_next/static/chunks/547-e48cce8e6a7eeb96.js";

    browser.webRequest.onBeforeRequest.addListener(
        (details) => {
            if (details.url === targetJSURL) {
                console.log(`Overwriting website js (${details.url})`);

                return {
                    redirectUrl: browser.runtime.getURL("website-overrides/547-e48cce8e6a7eeb96.js")
                };
            }
        }, {
            urls: [targetJSURL],
            types: ["script"]
        }, ["blocking"]
    );
};

console.log("On installed");

const tabs: Record<number, browser.tabs.Tab> = {};

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({
        url: browser.runtime.getURL("src/pages/options/index.html"),
        active: true,
    });
});

const isMainSite = (url: string) => {
    if (!siteMatches?.length) return false;

    const siteMatchesWithoutAsterisk = siteMatches.map((site) =>
        site.replaceAll("*", "")
    );

    return siteMatchesWithoutAsterisk.some((site) => url.includes(site));
};

const queryAndSaveTabs = async () => {
    const queriedTabs = await browser.tabs.query({});

    queriedTabs.forEach((tab) => {
        tabs[tab.id] = tab;
    });
};

browser.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status !== "complete") return;

    const existingTab = tabs[tabId];

    const currentTab = tab;

    if (existingTab) {
        // If saved tab url is our target website and updated tab url is not
        // that mean user just navigate away from our website
        if (isMainSite(existingTab.url) && !isMainSite(currentTab.url)) {
            console.log("[onUpdated] Clearing rules");

            await clearRules();
        }
    }

    tabs[tabId] = tab;
});

browser.tabs.onRemoved.addListener(async function (tabId) {
    if (!(tabId in tabs)) return;

    const tab = tabs[tabId];

    if (!isMainSite(tab.url)) return;

    await clearRules();

    delete tabs[tabId];
});

queryAndSaveTabs();

// Intermediate (communication between web page and firefox extension)
registerMessageIntermediate();
// Listener (communication between intermediate and firefox extension)
registerListener();
initializeListeners();
