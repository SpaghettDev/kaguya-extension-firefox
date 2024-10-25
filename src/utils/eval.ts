let offscreenTabId: number = -1;

export const evalScript = async <T extends unknown>(
    script: string
): Promise<T> => {
    if (offscreenTabId == -1) {
        const offscreenTab = await browser.tabs.create({
            url: browser.runtime.getURL("src/pages/offscreen/index.html"),
            active: false
        });
        offscreenTabId = offscreenTab.id;
        
        browser.tabs.hide(offscreenTabId);
    }

    return new Promise(async (resolve) => {
        const listener = (message: any, _: browser.runtime.MessageSender) => {
            if (
                message?.target !== "background" ||
                message?.type !== "SANDBOX_EVAL"
            )
                return;

            browser.runtime.onMessage.removeListener(listener);

            resolve(message?.result);
        };

        browser.runtime.onMessage.addListener(listener);

        browser.runtime.sendMessage({
            target: "offscreen",
            data: script,
            type: "SANDBOX_EVAL",
        });
    });
};
