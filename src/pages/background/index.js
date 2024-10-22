import {
    AnimeServices,
    MangaServices,
    clearRules,
    getHostname,
    AddRule
} from "../../../assets/js/index.8404c945.js";

const targetJSURL = "https://kaguya.app/_next/static/chunks/547-e48cce8e6a7eeb96.js";

browser.webRequest.onBeforeRequest.addListener(
    (r) => {
        if (r.url === targetJSURL) {
            console.log(`Overwriting incorrect js (${r.url}) to local`);

            return {
                redirectUrl: browser.runtime.getURL("_website/547-e48cce8e6a7eeb96.js")
            };
        }
    },
    {
        urls: [targetJSURL],
        types: ["script"]
    },
    ["blocking"]
);

const d = [
    "https://kaguya.app/*",
    "http://localhost/*",
    "https://*.kaguya.app/*",
];
var EventType = {
    Request: "REQUEST",
    Response: "RESPONSE",
};
const listeners = {};

function pushListener(e, t) {
    return (
        (listeners[e] = t),
        () => {
            delete listeners[e];
        }
    );
}

const registerListener = () => {
    browser.runtime.onMessage.addListener(
        (event, sender, sendResponse) => (
            (async () => {
                try {
                    if (!event?.endpoint || event?.type !== EventType.Request) return;
                    if (!(event?.endpoint in listeners)) return;

                    console.log(`target endpoint: ${event.endpoint} with data`, event.data);

                    const listener = listeners[event.endpoint];
                    const data = await listener(event.data);

                    console.log("data from listener", data);

                    sendResponse({ data: data, type: "message" });
                } catch (err) {
                    sendResponse({ error: err.message, type: "error" });
                }
            })(),
            !0
        )
    );
};

browser.runtime.onMessage.addListener((e, t, r) => {
    (e == null ? void 0 : e.to) === "background" &&
        (e == null ? void 0 : e.endpoint) === "tabId" &&
        (console.log(t.tab), t.tab.id);
});

const I = (e) => {
        const t = [];
        for (const [r, a] of Object.entries(e))
            t.push({
                id: r,
                isNSFW: a.isNSFW,
                languages: a.languages,
                logo: a.logo,
                name: a.name,
                url: a.url,
            });
        return t;
    },
    M = async () => I(AnimeServices),
    O = async () => I(MangaServices),
    T = [
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
    ],
    updateRules = (e) => {
        const t = T;
        for (const r of (e == null ? void 0 : e.rules) || []) t.push(r);
        return AddRule(t);
    },
    getAnimeService = async (e) => (e in AnimeServices ? AnimeServices[e] : null),
    getMangaService = async (e) => (e in MangaServices ? MangaServices[e] : null),
    initializeListeners = () => {
        pushListener("update-rules", async ({ fileUrls: e }) => {
            const t = [],
                r = [];
            for (const a of e) {
                const o = a.headers;
                if (!o || !Object.keys(o)) continue;
                const s = getHostname(a.url);
                s && !r.includes(s) && r.push(s);
                for (const [R, y] of Object.entries(o))
                    t.some((E) => E.header === R && E.value === y) ||
                        t.push({
                            header: R,
                            value: y,
                            operation: "set",
                        });
            }
            return (
                await AddRule([
                    {
                        action: {
                            type: "modifyHeaders",
                            requestHeaders: t,
                        },
                        condition: {
                            requestDomains: r,
                            resourceTypes: [
                                browser.declarativeNetRequest.ResourceType.MEDIA,
                                browser.declarativeNetRequest.ResourceType.IMAGE,
                                browser.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
                            ],
                        },
                    },
                ]),
                !0
            );
        }),
            pushListener("search-anime", async (e) => {
                if (!e) throw new Error("Invalid data");
                const { anilist: t, sourceId: r, query: a } = e,
                    o = await getAnimeService(r);
                return await clearRules(), await updateRules(o), await o.totalSearch(t, a);
            }),
            pushListener("search-manga", async (e) => {
                if (!e) throw new Error("Invalid data");
                const { anilist: t, sourceId: r, query: a } = e,
                    o = await getMangaService(r);
                return await clearRules(), await updateRules(o), o.totalSearch(t, a);
            }),
            pushListener("get-anime-sources", async () => await M()),
            pushListener("get-manga-sources", async () => await O()),
            pushListener("get-anime-id", async (e) => {
                if (!e) throw new Error("Invalid data");
                const { anilist: t, sourceId: r } = e;
                return await (await getAnimeService(r)).getAnimeId(t);
            }),
            pushListener("get-episodes", async (e) => {
                if (!e) throw new Error("Invalid data");
                const { animeId: t, extraData: r, sourceId: a } = e,
                    o = await getAnimeService(a);
                return await clearRules(), await updateRules(o), await o.loadEpisodes(t, r);
            }),
            pushListener("get-video-servers", async (e) => {
                if (!e) throw new Error("Invalid data");
                const { episodeId: t, sourceId: r, extraData: a } = e;
                return await (await getAnimeService(r)).loadVideoServers(t, a);
            }),
            pushListener("get-video-container", async (e) => {
                if (!e) throw new Error("Invalid data");
                const { videoServer: t, extraData: r, sourceId: a } = e;
                return await (await getAnimeService(a)).loadVideoContainer(t, r);
            }),
            pushListener("get-manga-id", async (e) => {
                if (!e) throw new Error("Invalid data");
                const { anilist: t, sourceId: r } = e;
                return (await getMangaService(r)).getMangaId(t);
            }),
            pushListener("get-chapters", async (e) => {
                if (!e) throw new Error("Invalid data");
                const { mangaId: t, extraData: r, sourceId: a } = e,
                    o = await getMangaService(a);
                return await clearRules(), await updateRules(o), o.loadChapters(t, r);
            }),
            pushListener("get-images", async (e) => {
                if (!e) throw new Error("Invalid data");
                const { chapterId: t, sourceId: r, extraData: a } = e;
                return (await getMangaService(r)).loadImages(t, a);
            });
    };

console.log("On installed");
const c = {};
browser.browserAction.onClicked.addListener((tab, onClickData) => {
    browser.tabs.create({
        url: browser.runtime.getURL("src/pages/options/index.html"),
        active: !0,
    });
});
const f = (e) =>
    d != null && d.length
        ? d.map((r) => r.replaceAll("*", "")).some((r) => e.includes(r))
        : !1;
browser.tabs.query({}, function (e) {
    e.forEach((t) => {
        c[t.id] = t;
    });
});
browser.tabs.onUpdated.addListener(async function (e, t, r) {
    if (t.status !== "complete") return;
    const a = c[e],
        o = r;
    a &&
        f(a.url) &&
        !f(o.url) &&
        (console.log("[onUpdated] Clearing rules"), await clearRules()),
        (c[e] = r);
});
browser.tabs.onRemoved.addListener(async function (e) {
    if (!(e in c)) return;
    const t = c[e];
    !f(t.url) || (await clearRules(), delete c[e]);
});

registerListener();
initializeListeners();

(async () => {
    await clearRules();
    await updateRules();
});
