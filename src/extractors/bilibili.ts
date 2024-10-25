import { removeDuplicates } from "@src/utils";

export declare namespace Bilibili {
    export interface SegmentBase {
        range: string;
        index_range: string;
    }

    export interface VideoResource {
        id: string;
        quality: number;
        bandwidth: number;
        codec_id: number;
        duration: number;
        size: number;
        md5: string;
        url: string;
        backup_url?: string[];
        container: number;
        start_with_sap: number;
        codecs: string;
        sar: string;
        frame_rate: string;
        segment_base: SegmentBase;
        width: number;
        height: number;
        mime_type: string;
    }

    export interface StreamInfo {
        quality: number;
        desc_text: string;
        desc_words: string;
        intact: boolean;
        no_rexcode: boolean;
    }

    export interface Video {
        video_resource: VideoResource;
        stream_info: StreamInfo;
        audio_quality: number;
    }

    export interface SegmentBase2 {
        range: string;
        index_range: string;
    }

    export interface AudioResource {
        id: string;
        quality: number;
        bandwidth: number;
        codec_id: number;
        duration: number;
        size: number;
        md5: string;
        url: string;
        backup_url?: string[];
        container: number;
        start_with_sap: number;
        codecs: string;
        sar: string;
        frame_rate: string;
        segment_base: SegmentBase2;
        width: number;
        height: number;
        mime_type: string;
    }

    export interface Playurl {
        quality: number;
        duration: number;
        expire_at: number;
        video: Video[];
        audio_resource: AudioResource[];
    }

    export interface Data {
        playurl: Playurl;
    }

    export interface VideoSourceResponse {
        code: number;
        message: string;
        ttl: number;
        data: Data;
    }

    export interface Subtitle {
        url: string;
        lang: string;
        lang_key: string;
        subtitle_id: any;
    }

    export interface Data {
        subtitles: Subtitle[];
    }

    export interface SubtitleResponse {
        code: number;
        message: string;
        ttl: number;
        data: Data;
    }
}

function convertDuration(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `PT${hours}H${minutes}M${seconds}S`;
}

const bilibiliExtractor = (data: Bilibili.Playurl) => {
    const videoSegment = (video: Bilibili.VideoResource, index = 0) => {
        const allUrls = [video.url, ...(video?.backup_url || [])];

        const videoUrl = (() => {
            if (video.url) return video.url;

            const validUrl = allUrls.find(Boolean);

            return validUrl;
        })();

        if (!videoUrl) return null;

        return `
              <Representation id="${index}" mimeType="${
            video.mime_type
        }" codecs="${video.codecs}" width="${video.width}" height="${
            video.height
        }" frameRate="${video.frame_rate}" sar="${video.sar}" bandwidth="${
            video.bandwidth
        }">
                  <BaseURL>${videoUrl.replace(/&/g, "&amp;")}</BaseURL>
                  <SegmentBase indexRangeExact="true" indexRange="${
                      video.segment_base.index_range
                  }">
                      <Initialization range="${video.segment_base.range}"/>
                  </SegmentBase>
              </Representation>
              `;
    };

    const audioSegment = (audio: Bilibili.AudioResource, index = 0) => {
        const allUrls = [audio.url, ...(audio?.backup_url || [])];

        const audioUrl = (() => {
            if (audio.url) return audio.url;

            const validUrl = allUrls.find(Boolean);

            return validUrl;
        })();

        if (!audioUrl) return null;

        return `
              <Representation id="${index}" mimeType="${
            audio.mime_type
        }" codecs="${audio.codecs}" bandwidth="${audio.bandwidth}">
                  <BaseURL>${audioUrl.replace(/&/g, "&amp;")}</BaseURL>
                  <SegmentBase indexRangeExact="true" indexRange="${
                      audio.segment_base.index_range
                  }">
                      <Initialization range="${audio.segment_base.range}"/>
                  </SegmentBase>
              </Representation>
              `;
    };

    const videos = data.video
        .filter((video) => video.video_resource.url)
        .map((video) => video.video_resource);

    const notDuplicatedVideos = removeDuplicates(
        videos,
        (a, b) => a.height === b.height
    );

    const audios = data.audio_resource;

    const duration = convertDuration(data.duration);

    const dash = `<?xml version="1.0"?>
      <MPD xmlns="urn:mpeg:dash:schema:mpd:2011" profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT1M" type="static" mediaPresentationDuration="${duration}">
          <Period duration="${duration}">
              <AdaptationSet id="1" group="1" par="16:9" segmentAlignment="true" subsegmentAlignment="true" subsegmentStartsWithSAP="1" maxWidth="${
                  videos[0].width
              }" maxHeight="${videos[0].height}" maxFrameRate="${
        videos[0].frame_rate
    }" startWithSAP="1">
                  ${notDuplicatedVideos
                      .map((video, index) => videoSegment(video, index))
                      .filter(Boolean)
                      .join()}
              </AdaptationSet>
              <AdaptationSet id="2" group="2" subsegmentAlignment="true" subsegmentStartsWithSAP="1" segmentAlignment="true" startWithSAP="1">
                  ${audios
                      .map((audio, index) =>
                          audioSegment(audio, videos.length + index)
                      )
                      .filter(Boolean)
                      .join()}
              </AdaptationSet>
          </Period>
      </MPD>`;

    return dash;
};

export default bilibiliExtractor;
