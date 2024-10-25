window.addEventListener(
    "message",
    (event) => {
        if (event.source != window) return;
        if (event.data?.type === "extensionResponse") return;
        if (event.origin !== "https://kaguya.app") return;

        browser.runtime.sendMessage(event.data).then((m) => {
            window.postMessage({ type: "extensionResponse", response: m }, event.origin);
        });
    },
    false
);

window.addEventListener("request-ext_id", (event) => {
    event.stopImmediatePropagation();

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

    browser.runtime.onMessage.addListener((message, _, sendResponse) => {
        if (message?.to !== "content") return;
        if (message?.endpoint !== "blob_url") return;
        if (!message?.data) return;

        if (!message?.data?.string) return;

        const url = URL.createObjectURL(
            new Blob([message.data.string], message.data.options)
        );

        sendResponse({
            from: "content",
            to: "background",
            data: url,
            endpoint: "blob_url",
        });
    });
});
