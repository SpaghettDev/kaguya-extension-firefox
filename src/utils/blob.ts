import { sendMessageToContent } from "./events";

type EndingType = "native" | "transparent";

interface BlobPropertyBag {
    endings?: EndingType;
    type?: string;
}

export const createBlobUrlFromString = async (
    string: string,
    options?: BlobPropertyBag
) => {
    const url = (await sendMessageToContent("blob_url", {
        string,
        options,
    })) as string;

    return url;
};
