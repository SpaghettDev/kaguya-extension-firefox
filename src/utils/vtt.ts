function pad(num: number) {
    if (num < 10) {
        return "0" + num;
    }

    return num;
}
function formatTime(sec: number): string {
    if (typeof sec !== "number") {
        throw new Error("Invalid type: expected number");
    }

    const seconds: string = (sec % 60).toFixed(3);
    const minutes: number = Math.floor(sec / 60) % 60;
    const hours: number = Math.floor(sec / 60 / 60);

    // @ts-ignore
    return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

interface SubtitleSettings {
    [key: string]: string | number | boolean;
}

class SubtitleBuilder {
    private counter: number;
    private content: string;

    constructor() {
        this.counter = 0;
        this.content = "WEBVTT\r\n";
    }

    public add(
        from: number,
        to: number,
        lines: string | string[],
        settings?: SubtitleSettings
    ): void {
        this.counter++;
        lines = Array.isArray(lines) ? lines : [lines];

        this.content +=
            "\r\n" +
            this.counter +
            "\r\n" +
            formatTime(from) +
            " --> " +
            formatTime(to) +
            (settings ? " " + this.serializeSettings(settings) : "") +
            "\r\n";

        lines.forEach((line) => {
            this.content += line + "\r\n";
        });
    }

    public toString(): string {
        return this.content;
    }

    private serializeSettings(settings: SubtitleSettings): string {
        return Object.entries(settings)
            .map(([key, value]) => `${key}:${value}`)
            .join(" ");
    }
}

export default SubtitleBuilder;
