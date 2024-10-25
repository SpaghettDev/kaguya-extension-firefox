import { FontType } from "./Font";
import { SubtitleType } from "./Subtitle";
import { TimestampType } from "./Timestamp";
import { VideoType } from "./Video";

export interface VideoContainerType {
    videos: VideoType[];
    subtitles?: SubtitleType[];
    fonts?: FontType[];
    timestamps?: TimestampType[];
}

export default function VideoContainer(data: VideoContainerType) {
    return data;
}
