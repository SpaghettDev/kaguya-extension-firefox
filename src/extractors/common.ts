import { VideoFormat, VideoType } from "@src/core/Video";
import { OKRUVideoOptions } from "@src/models/extractors/common";
import { parseBetween } from "@src/utils";
import { unpack } from "@src/utils/unpacker";
import { load } from "cheerio";

export const extractDoodstream = async (link: string): Promise<VideoType[]> => {
    const response = await fetch(link).then((res) => res.text());

    if (!response.includes("'/pass_md5/"))
        return null;

    const doodURL = new URL(link);
    const md5: string = parseBetween(response, "'/pass_md5/", "',");
    const token = md5.split("/").at(-1);
    const expiry = Date.now();

    const videoUrlStart = await fetch(`${doodURL.origin}/pass_md5/${md5}`, {
        headers: {
            Referer: link,
        }
    }).then((res) => res.text());

    const videoUrl = `${videoUrlStart}${randomString()}?token=${token}&expiry=${expiry}`;

    return [{
        file: {
            url: videoUrl,
            headers: { Referer: videoUrl },
        },
        format: VideoFormat.CONTAINER,
    }];
};

export const extractOkRU = async (link: string): Promise<VideoType[]> => {
    const response = await fetch(link).then((res) => res.text());

    const $ = load(response);

    const OKVideoOptions: OKRUVideoOptions = JSON.parse(
        ($('[data-module="OKVideo"]').data("options") as string).replace(
            /metadata":"{(.*)}"/,
            'metadata":{$1}'
        )
    );

    return [{
        file: {
            url: OKVideoOptions.flashvars.metadata.hlsManifestUrl,
            headers: {
                Host: new URL(link).host,
                Referer: link,
            }
        },
        format: VideoFormat.HLS,
    }];
};

export const extractMP4Upload = async (link: string): Promise<VideoType[]> => {
    const response = await fetch(link, {
        headers: { Referer: "https://mp4upload.com/" }
    }).then((res) => res.text());

    try {
        const mp4Link = parseBetween(response, 'src: "', '"');

        return [{
            file: {
                url: mp4Link,
                headers: {
                    host: "mp4upload.com",
                    Referer: link,
                },
            },
            format: VideoFormat.CONTAINER,
        }];
    } catch(_) {
        try {
            const packedString =
                "eval(function(p,a,c,k,e,d)" +
                parseBetween(
                    response,
                    "<script>eval(function(p,a,c,k,e,d)",
                    "</script>"
                );
            const unpacked = unpack(packedString);

            const videoUrl = parseBetween(unpacked, 'player.src("', '");');

            return [{
                file: {
                    url: videoUrl,
                    headers: {
                        Host: "mp4upload.com",
                        Referer: "https://mp4upload.com/",
                    },
                },
                format: VideoFormat.CONTAINER,
            }];
        } catch (_) {
            return null;
        }
    };
};

export const extractFilemoon = async (link: string): Promise<VideoType[]> => {
    const response = await fetch(link).then((res) => res.text());

    const $ = load(response);

    const src = $("#iframe-holder iframe").attr("src");

    const sourceResponse = await fetch(src, {
        headers: { Host: new URL(link).host }
    }).then((res) => res.text());

    const packedString = parseBetween(
        sourceResponse,
        "<script data-cfasync='false' type='text/javascript'>",
        "</script>"
    );
    const unpacked = unpack(packedString);

    const sources: { sources: { file: string }[] } = JSON.parse(
        `{${
            parseBetween(unpacked, "setup({", ",")
            .replace(/(\w+):([^\/])/g, '"$1":$2')
        }}`
    );

    return sources.sources.map((source) => ({
        file: {
            url: source.file,
            headers: {
                Host: new URL(link).host,
                Referer: link,
            }
        },
        format: VideoFormat.HLS,
    } as VideoType));
};

export const extractStreamwish = async (link: string): Promise<VideoType[]> => {
    const response = await fetch(link).then((res) => res.text());

    const packedString = parseBetween(
        response,
        "<script type='text/javascript'>",
        "</script>"
    );
    const unpacked = unpack(packedString);

    const sources: { sources: { file: string }[] } = JSON.parse(
        `{"sources":[${
            parseBetween(unpacked, "sources:[", "],")
            .replace(/(\w+):([^\/])/g, '"$1":$2')
        }]}`
    );

    return sources.sources.map((source) => ({
        file: {
            url: source.file,
            headers: {
                Host: new URL(link).host,
                Referer: link,
            }
        },
        format: VideoFormat.HLS,
    } as VideoType));
};

export const extractVidhide = async (link: string): Promise<VideoType[]> => {
    const response = await fetch(link).then((res) => res.text());

    const packedString = parseBetween(
        response,
        "<script type='text/javascript'>",
        "</script>"
    );
    const unpacked = unpack(packedString);

    const sources: { sources: { file: string }[] } = JSON.parse(
        `{"sources":[${
            parseBetween(unpacked, "sources:[", "],")
            .replace(/(\w+):([^\/])/g, '"$1":$2')
        }]}`
    );

    return sources.sources.map((source) => ({
        file: {
            url: source.file,
            headers: {
                Host: new URL(link).host,
                Referer: link,
            },
        },
        format: VideoFormat.HLS,
    }) as VideoType);
};


const randomString = (
    length: number = 10,
    characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
): string => {
    return [...Array(length)].map(
        () => characters.at(Math.floor(Math.random() * characters.length))
    ).join("");
};
