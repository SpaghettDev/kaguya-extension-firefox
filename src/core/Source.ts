import { SearchResultType } from "./SearchResult";

export type SourceProps = {
    name: string;
    url: string;
    id: string;
    isNSFW: boolean;
    languages: string[];
    logo: string;
};

export default class Source implements SourceProps {
    name: string;
    url: string;
    id: string;
    isNSFW: boolean;
    languages: string[];
    logo: string;
    rules?: Omit<browser.declarativeNetRequest.Rule, "id">[];

    constructor({ id, isNSFW, languages, logo, name, url }: SourceProps) {
        this.id = id;
        this.isNSFW = isNSFW;
        this.languages = languages;
        this.logo = logo;
        this.name = name;
        this.url = url;
    }

    async search(query: string, anilist: any): Promise<SearchResultType[]> {
        throw new Error("Method not implemented.");
    }

    async totalSearch(
        anilist: any,
        query?: string
    ): Promise<SearchResultType[]> {
        if (query) {
            return this.search(query, anilist);
        }

        const titles = [
            ...new Set([anilist?.title?.english, anilist?.title?.romaji]),
        ];

        if (!titles?.length) return [];

        for (const title of titles) {
            try {
                const searchResults = await this.search(
                    title as string,
                    anilist
                );

                if (!searchResults?.length) continue;

                return searchResults;
            } catch (err) {
                console.error(err);
            }
        }

        return [];
    }

    //   updateRules(rules: chrome.declarativeNetRequest.Rule[]) {
    //     this.rules = rules;

    //     this._reupdateRules(rules);
    //   }

    //   private _reupdateRules(rules: chrome.declarativeNetRequest.Rule[]) {
    //     chrome.declarativeNetRequest.getDynamicRules((previousRules) => {
    //       const previousRuleIds = previousRules.map((rule) => rule.id);

    //       chrome.declarativeNetRequest.updateDynamicRules({
    //         removeRuleIds: previousRuleIds,
    //         addRules: [...initialRules, ...rules],
    //       });
    //     });
    //   }
}
