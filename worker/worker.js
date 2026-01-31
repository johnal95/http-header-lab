// @ts-check

/** @import { AppState } from "../types.js" */

/**
 * @param {AppState} state
 */
async function updateHeaderOverrides(state) {
    const REQUEST_RULE_ID = 42069;

    const activeHeaderOverrides = state.headerOverrides.filter((h) => h.active && h.name.length > 0);

    const requestRules =
        activeHeaderOverrides.length > 0
            ? [
                  {
                      id: REQUEST_RULE_ID,
                      priority: 1,
                      action: {
                          type: "modifyHeaders",
                          requestHeaders: activeHeaderOverrides.map((h) => ({
                              header: h.name,
                              value: h.value,
                              operation: "set",
                          })),
                      },
                      condition: {
                          urlFilter: "*",
                          resourceTypes: ["main_frame", "xmlhttprequest"],
                      },
                  },
              ]
            : undefined;

    // @ts-expect-error
    await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: requestRules,
        removeRuleIds: [REQUEST_RULE_ID],
    });
}

// @ts-expect-error
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type !== "APP_STATE_UPDATE") {
        return;
    }

    /** @type {AppState} */
    const state = msg.state;

    return updateHeaderOverrides(state);
});
