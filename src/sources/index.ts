import AnimeT from "./anime/animet";
import AnimeTVN from "./anime/animetvn";
import AnimeVietSub from "./anime/animevietsub";
import Gogo from "./anime/gogo";
import Bilibili from "./anime/bilibili";
import Anime47 from "./anime/anime47";
import AnimeHay from "./anime/animehay";
import KickAssAnime from "./anime/kickassanime";
import Zoro from "./anime/zoro";
import VuiGhe from "./anime/vuighe";
import AniWave from "./anime/aniwave";
import AnimePahe from "./anime/animepahe";
import Crunchyroll from "./anime/crunchyroll";
import Aniplay from "./anime/aniplay";
import HHHay from "./anime/hhhay";
import Sudatchi from "./anime/sudatchi";
import OPhim from "./anime/ophim";
import AllAnime from "./anime/allanime";

import MangaDex from "./manga/mangadex";
import NetTruyen from "./manga/nettruyen";
import MangaDexVN from "./manga/mangadexvn";
import BlogTruyenMoi from "./manga/blogtruyenmoi";
import Bato from "./manga/bato";
import MangaKatana from "./manga/mangakatana";
import BlogTruyen from "./manga/blogtruyen";

export const anime = {
    // anime47: new Anime47(),
    // animet: new AnimeT(),
    allanime: new AllAnime(),
    gogo: new Gogo(),
    // avs: new AnimeVietSub(),
    tvn: new AnimeTVN(),
    ah: new AnimeHay(),
    // bilibili: new Bilibili(),
    kickassanime: new KickAssAnime(),
    zoro: new Zoro(),
    // vuighe: new VuiGhe(),
    // aniwave: new AniWave(),
    animepahe: new AnimePahe(),
    // crunchyroll: new Crunchyroll(),
    aniplay: new Aniplay(),
    hhhay: new HHHay(),
    sudatchi: new Sudatchi(),
    ophim: new OPhim(),
} as const;

export const manga = {
    mangadex: new MangaDex(),
    mangadexvn: new MangaDexVN(),
    blogtruyen: new BlogTruyen(),
    blogtruyenmoi: new BlogTruyenMoi(),
    nettruyen: new NetTruyen(),
    mangakatana: new MangaKatana(),
    bato: new Bato(),
} as const;
