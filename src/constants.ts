// TODO: try to fix this idk how to
// import { anime, manga } from "./src/sources";

// export const requestPermissionPatterns = [
//     "https://*.kaguya.app/*",
//     ...Object.entries(anime).map(v => `${v[1].url}/*`),
//     ...Object.entries(manga).map(v => `${v[1].url}/*`),
// ];

export const siteMatches = [
    "https://kaguya.app/*",
    "http://localhost/*",
    "https://*.kaguya.app/*",
];

export const requestPermissionPatterns = [
    "https://*.kaguya.app/*",

    "https://*/*",

    // anime
    // "https://*.anime47.biz/*",
    // "https://*.animepahe.ru/*",
    // "https://*.animet2.net/*",
    // "https://*.animetvn4.com/*",
    // "https://*.animevietsub.fun/*",
    // "https://*.aniplay.co/*",
    // "https://*.aniwave.to/*",
    // "https://*.animehay.io/*",
    // "https://*.www.crunchyroll.com/*",
    // "https://*.anitaku.so/*",
    // "https://*.hhhay.tv/*",
    // "https://*.kickassanime.am/*",
    // "https://*.ophim.cc/*",
    // "https://*.sudatchi.com/*",
    // "https://*.vuighe3.com/*",
    // "https://*.kaido.to/*",

    // manga
    // "https://*.bato.to/*",
    // "https://*.blogtruyen.vn/*",
    // "https://*.blogtruyenmoi.com/*",
    // "https://*.mangadex.org/*",
    // "https://*.mangakatana.com/*",
    // "https://*.www.nettruyenbb.com/*"
];
