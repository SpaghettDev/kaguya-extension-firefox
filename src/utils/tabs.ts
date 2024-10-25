export function createTab(
    createProperties: browser.tabs._CreateCreateProperties
): Promise<browser.tabs.Tab> {
    return new Promise(async (resolve) => {
        const tab = await browser.tabs.create(createProperties);

        browser.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (info.status === "complete" && tabId === tab.id) {
                browser.tabs.onUpdated.removeListener(listener);
                resolve(tab);
            }
        });
    });
}
