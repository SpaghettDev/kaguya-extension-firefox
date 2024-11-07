import { compareNestedObjects, removeDuplicates, removeNullValues } from ".";

export const addRules = (
    newRules: Omit<browser.declarativeNetRequest.Rule, "id">[],
    options?: browser.declarativeNetRequest._UpdateDynamicRulesOptions
) => {
    return new Promise(async (resolve) => {
        const dynamicRules = await browser.declarativeNetRequest.getDynamicRules();

        // Firefox's getDynamicRules API returns the Rule object with non-provided
        // options as keys with their values being null,
        // this breaks the compareNestedObjects function
        const existRules = dynamicRules.map((rule) => { return removeNullValues(rule); });

        const ruleIds = existRules.map((rule) => rule.id);
        const maxRuleId = Math.max(...ruleIds);

        let currentRuleId = ruleIds?.length ? maxRuleId : 0;

        // Combine newRules and existRules
        const allRules = [...newRules, ...existRules];

        // Remove duplicates by converting to Set and back to array
        const uniqueRules = removeDuplicates(
            allRules.filter(Boolean),
            (a, b) => {
                // Check condition
                if (!compareNestedObjects(a.condition, b.condition))
                    return false;

                // Check action
                return compareNestedObjects(a.action, b.action);
            }
        );

        const newRulesWithId: browser.declarativeNetRequest.Rule[] =
            uniqueRules.map((rule) => ({ ...rule, id: ++currentRuleId }));

        console.log("adding new rules", newRulesWithId);

        await browser.declarativeNetRequest.updateDynamicRules({
            addRules: newRulesWithId,
            ...options,
        });

        console.log("added rules");

        resolve(null);
    });
};

export const clearRules = () => {
    return new Promise(async (resolve) => {
        const existRules = await browser.declarativeNetRequest.getDynamicRules();

        const ruleIds = existRules.map((rule) => rule.id);

        await browser.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: ruleIds,
        });

        resolve(null);
    });
};
