import { FileUrlType } from "./FileUrl";

export enum SubtitleFormat {
    VTT = "vtt",
    ASS = "ass",
    SRT = "srt",
}

export interface SubtitleType {
    language: String;
    file: FileUrlType;
    format?: SubtitleFormat;
}

export default function Subtitle(data: SubtitleType) {
    return data;
}
