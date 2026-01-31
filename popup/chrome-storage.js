// @ts-check

/** @import { ChromeStorage } from "../types" */

/**
 * @template {object} T
 * @param {string} key
 * @returns {ChromeStorage<T>}
 */
function createChromeStorageLocal(key) {
    return {
        async get() {
            /** @type {{[key]?: T}} */
            // @ts-expect-error
            const persisted = await chrome.storage.local.get([key]);
            return persisted[key] ?? null;
        },
        async set(value) {
            // @ts-expect-error
            await chrome.storage.local.set({ [key]: value });
            return value;
        },
    };
}

export { createChromeStorageLocal };
