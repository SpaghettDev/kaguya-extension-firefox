window.addEventListener(
    "message",
    (event) => {
        console.log(`Intermediary received event with origin ${event.origin}`);

        if (event.source != window) return;
        if (event.data?.type === "extensionResponse") return;
        if (event.origin !== "https://kaguya.app") return;

        browser.runtime.sendMessage(event.data).then((m) => {
            window.postMessage({ type: "extensionResponse", res: m }, event.origin);
        });
    },
    false
);

window.addEventListener("request-ext_id", (t) => {
    t.stopImmediatePropagation();
    dispatchEvent(
        new CustomEvent("response-ext_id", { detail: browser.runtime.id })
    );
});

window.addEventListener("DOMContentLoaded", async () => {
    browser.runtime.sendMessage({
        endpoint: "tabId",
        from: "content",
        to: "background",
    });

    browser.runtime.onMessage.addListener((event, sender, sendResponse) => {
        var n;
        if (
            (event == null ? void 0 : event.to) !== "content" ||
            (event == null ? void 0 : event.endpoint) !== "blob_url" ||
            !(event != null && event.data) ||
            !((n = event == null ? void 0 : event.data) != null && n.string)
        )
            return;

        const r = URL.createObjectURL(
            new Blob([event.data.string], event.data.options)
        );

        sendResponse({
            from: "content",
            to: "background",
            data: r,
            endpoint: "blob_url",
        });
    });
});
