import { EventTarget } from "event-target-shim";

interface HugeUploaderParams {
    endpoint: string;
    file: Blob;
    headers?: Record<string, string>;
    postParams?: Record<string, string>;
    chunkSize?: number;
    retries?: number;
    delayBeforeRetry?: number;
}

class HugeUploader {
    private endpoint: string;
    private file: Blob;
    private headers: Record<string, string>;
    private postParams?: Record<string, string>;
    private chunkSize: number;
    private retries: number;
    private delayBeforeRetry: number;

    private chunk: Blob | null;
    private chunkCount: number;
    private totalChunks: number;
    private retriesCount: number;
    private paused: boolean;

    private _reader: FileReader;
    private _eventTarget: EventTarget;

    constructor(params: HugeUploaderParams) {
        this.endpoint = params.endpoint;
        this.file = params.file;
        this.headers = params.headers || {};
        this.postParams = params.postParams;
        this.chunkSize = params.chunkSize || 10;
        this.retries = params.retries || 5;
        this.delayBeforeRetry = params.delayBeforeRetry || 5;

        this.chunk = null;
        this.chunkCount = 0;
        this.totalChunks = Math.ceil(
            this.file.size / (this.chunkSize * 1000 * 1000)
        );
        this.retriesCount = 0;
        this.paused = false;

        this.headers["uploader-file-id"] = this._uniqid().toString();
        this.headers["uploader-chunks-total"] = this.totalChunks.toString();

        this._reader = new FileReader();
        this._eventTarget = new EventTarget();

        this._validateParams();
        this._sendChunks();
    }

    /**
     * Subscribe to an event
     */
    on(eType, fn) {
        this._eventTarget.addEventListener(eType, fn);
    }

    /**
     * Validate params and throw error if not of the right type
     */
    _validateParams() {
        if (!this.endpoint || !this.endpoint.length)
            throw new TypeError("endpoint must be defined");
        if (this.file instanceof Blob === false)
            throw new TypeError("file must be a File object");
        if (this.headers && typeof this.headers !== "object")
            throw new TypeError("headers must be null or an object");
        if (this.postParams && typeof this.postParams !== "object")
            throw new TypeError("postParams must be null or an object");
        if (
            this.chunkSize &&
            (typeof this.chunkSize !== "number" || this.chunkSize === 0)
        )
            throw new TypeError("chunkSize must be a positive number");
        if (
            this.retries &&
            (typeof this.retries !== "number" || this.retries === 0)
        )
            throw new TypeError("retries must be a positive number");
        if (this.delayBeforeRetry && typeof this.delayBeforeRetry !== "number")
            throw new TypeError("delayBeforeRetry must be a positive number");
    }

    /**
     * Generate uniqid based on file size, date & pseudo random number generation
     */
    _uniqid() {
        return (
            Math.floor(Math.random() * 100000000) + Date.now() + this.file.size
        );
    }

    /**
     * Get portion of the file of x bytes corresponding to chunkSize
     */
    _getChunk() {
        return new Promise((resolve) => {
            const length =
                this.totalChunks === 1
                    ? this.file.size
                    : this.chunkSize * 1000 * 1000;
            const start = length * this.chunkCount;

            this._reader.onload = () => {
                this.chunk = new Blob([this._reader.result], {
                    type: "application/octet-stream",
                });
                resolve(null);
            };

            this._reader.readAsArrayBuffer(
                this.file.slice(start, start + length)
            );
        });
    }

    /**
     * Send chunk of the file with appropriate headers and add post parameters if it's last chunk
     */
    _sendChunk() {
        const form = new FormData();

        // send post fields on last request
        if (this.chunkCount + 1 === this.totalChunks && this.postParams)
            Object.keys(this.postParams).forEach((key) =>
                form.append(key, this.postParams[key])
            );

        form.append("file", this.chunk);
        this.headers["uploader-chunk-number"] = this.chunkCount.toString();

        return fetch(this.endpoint, {
            method: "POST",
            headers: this.headers,
            body: form,
        });
    }

    /**
     * Called on net failure. If retry counter !== 0, retry after delayBeforeRetry
     */
    _manageRetries() {
        if (this.retriesCount++ < this.retries) {
            setTimeout(() => this._sendChunks(), this.delayBeforeRetry * 1000);
            this._eventTarget.dispatchEvent(
                // @ts-ignore
                new CustomEvent("fileRetry", {
                    detail: {
                        message: `An error occured uploading chunk ${
                            this.chunkCount
                        }. ${this.retries - this.retriesCount} retries left`,
                        chunk: this.chunkCount,
                        retriesLeft: this.retries - this.retriesCount,
                    },
                })
            );
            return;
        }

        this._eventTarget.dispatchEvent(
            // @ts-ignore
            new CustomEvent("error", {
                detail: `An error occured uploading chunk ${this.chunkCount}. No more retries, stopping upload`,
            })
        );
    }

    /**
     * Manage the whole upload by calling getChunk & sendChunk
     * handle errors & retries and dispatch events
     */
    _sendChunks() {
        if (this.paused) return;

        this._getChunk()
            .then(() => this._sendChunk())
            .then((res) => {
                if (
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 204
                ) {
                    if (++this.chunkCount < this.totalChunks)
                        this._sendChunks();
                    else {
                        res.text().then((body) => {
                            this._eventTarget.dispatchEvent(
                                // @ts-ignore
                                new CustomEvent("finish", { detail: body })
                            );
                        });
                    }

                    const percentProgress = Math.round(
                        (100 / this.totalChunks) * this.chunkCount
                    );
                    this._eventTarget.dispatchEvent(
                        // @ts-ignore
                        new CustomEvent("progress", { detail: percentProgress })
                    );
                }

                // errors that might be temporary, wait a bit then retry
                else if ([408, 502, 503, 504].includes(res.status)) {
                    if (this.paused) return;
                    this._manageRetries();
                } else {
                    if (this.paused) return;
                    this._eventTarget.dispatchEvent(
                        // @ts-ignore
                        new CustomEvent("error", { detail: res })
                    );
                }
            })
            .catch((err) => {
                if (this.paused) return;

                // this type of error can happen after network disconnection on CORS setup
                this._manageRetries();
            });
    }

    togglePause() {
        this.paused = !this.paused;

        if (!this.paused) this._sendChunks();
    }
}

export default HugeUploader;
