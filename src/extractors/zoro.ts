// source: https://github.com/user70853572305239875909542835673652937/Diogenes
// made to use crypto-js by SpaghettDev
import CryptoJS from "crypto-js";

export const extractVariables = (text: string): number[][] => {
    const regex =
        /case\s*0x[0-9a-f]+:(?![^;]*=partKey)\s*\w+\s*=\s*(\w+),\s*\w+\s*=\s*(\w+);/g;
    const matches = text.matchAll(regex);

    const vars = Array.from(matches, (match) => {
        const key1 = matchingKey(match[1], text);
        const key2 = matchingKey(match[2], text);
        return [parseInt(key1, 16), parseInt(key2, 16)];
    }).filter((pair) => pair.every((num) => !isNaN(num)));

    return vars;
};

export const getSecret = (
        encrypted: string, values: number[][]
): { secret: string, encryptedSource: string } => {
    let secret = "";
    const encryptedSourceArray = encrypted.split("");
    let currentIndex = 0;

    for (const [startOffset, length] of values) {
        const start = startOffset + currentIndex;
        const end = start + length;

        for (let i = start; i < end; i++) {
            secret += encrypted[i];
            encryptedSourceArray[i] = "";
        }
        currentIndex += length;
    }

    const encryptedSource = encryptedSourceArray.join("");

    return { secret, encryptedSource };
};

export const decryptSource = (encrypted: string, secret: string): string => {
    const cipherBuffer = uint8FromString(atob(encrypted));
    const salt = cipherBuffer.subarray(8, 16);
    const password = new Uint8Array([...uint8FromString(secret), ...salt]);

    const md5Hashes: Uint8Array[] = [];
    let digest: Uint8Array = password;
    for (let i = 0; i < 3; i++) {
        const hash = wordArrayToUint8Array(CryptoJS.MD5(uint8ArrayToWordArray(digest)));
        md5Hashes.push(hash);
        digest = new Uint8Array([...hash, ...password]);
    }

    const key = new Uint8Array([...md5Hashes[0], ...md5Hashes[1]]);
    const iv = md5Hashes[2];
    const content = cipherBuffer.subarray(16);

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: uint8ArrayToWordArray(content) },
        uint8ArrayToWordArray(key),
        {
            iv: uint8ArrayToWordArray(iv),
            mode: CryptoJS.mode.CBC,
            keySize: 256,
        }
    );

    return CryptoJS.enc.Utf8.stringify(decrypted);
};


const uint8FromString = (str: string): Uint8Array => {
    return new Uint8Array(str.split("").map((e) => e.charCodeAt(0)));
};

const wordArrayToUint8Array = (wordArray: CryptoJS.lib.WordArray): Uint8Array => {
    const len = wordArray.words.length;
    const u8Array = new Uint8Array(len << 2);
    let offset = 0;
    let word: number;

    for (let i = 0; i < len; i++) {
        word = wordArray.words[i];
        u8Array[offset++] = word >> 24;
        u8Array[offset++] = (word >> 16) & 0xff;
        u8Array[offset++] = (word >> 8) & 0xff;
        u8Array[offset++] = word & 0xff;
    }

    return u8Array;
};

const uint8ArrayToWordArray = (u8Array: Uint8Array): CryptoJS.lib.WordArray => {
    return CryptoJS.lib.WordArray.create(u8Array);
};

const matchingKey = (variableName: string, text: string): string => {
    const regex = new RegExp(`,${variableName}=((?:0x)?([0-9a-fA-F]+))`);
    const match = text.match(regex);
    if (match) {
        return match[1].replace(/^0x/, "");
    } else {
        throw new Error("Failed to match the key.");
    }
};
