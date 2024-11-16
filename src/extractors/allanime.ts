import { VideoFormat, VideoType } from "@src/core/Video";
import { AllAnimeClockResponse } from "@src/models/anime/allanime";
import {
    decryptEncryptAjaxResponse, generateEncryptAjaxParameters,
    GOGO_USER_AGENT, Source
} from "@src/extractors/gogo";
import { load } from "cheerio";

export const decryptAllAnime = (password: string, target: string): string => {
    const data: number[] = hexToBytes(target);
    const decrypted: string[] = [];

    for (let segment of data) {
        for (let i = 0; i < password.length; i++) {
            segment ^= 56;
        }

        decrypted.push(String.fromCharCode(segment));
    }

    return decrypted.join("");
};


export const extractAllAnime = async (link: string): Promise<VideoType[]> => {
    const response: AllAnimeClockResponse = await fetch(link).then((res) => res.json());

    return response.links.map((source) => ({
        file: {
            url: source.link,
            headers: {
                Host: "",
                Referer: "",
                Origin: "",
            },
        },
        quality: source.resolutionStr,
        format: source.hls ? VideoFormat.HLS : VideoFormat.DASH,
    } as VideoType));
};

export const extractAllAnimeGogo = async (link: string): Promise<VideoType[]> => {
    const response = await fetch(link).then((res) => res.text());

    const $ = load(response);
    const serverUrl = new URL(link);

    if ($("script[data-name='episode']").data() === undefined)
        return null;

    const params = await generateEncryptAjaxParameters(
        $,
        serverUrl.searchParams.get("id") ?? ''
    );

    const fetchResponse = await fetch(
        `${serverUrl.protocol}//${serverUrl.hostname}/encrypt-ajax.php?${params}`,
        {
            headers: {
                "User-Agent": GOGO_USER_AGENT,
                "X-Requested-With": "XMLHttpRequest",
            },
        }
    );

    const fetchRes = await fetchResponse.json();

    const res = decryptEncryptAjaxResponse(fetchRes);

    if (!res.source) return null;

    return [...res.source, ...res.source_bk].map((source: Source) => ({
        file: {
            url: source.file,
            headers: { Referer: serverUrl.href },
        },
        format: VideoFormat.CONTAINER,
        quality: source.label,
    } as VideoType));
};


const hexToBytes = (hexString: string): number[] => {
    return hexString.match(/.{1,2}/g).map((hex) => parseInt(hex, 16));
};
