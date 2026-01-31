// @ts-check

import { createChromeStorageLocal } from "./chrome-storage.js";

/** @import { AppState, ChromeStorage, HeaderOverride, StateService } from "../types" */

/** @type {AppState} */
const initialState = {
    headerOverrides: [],
};

/** @returns {Promise<StateService>} */
async function createStateService() {
    /** @type {ChromeStorage<AppState>} */
    const chromeStorageSync = createChromeStorageLocal("http_header_lab_state");

    /** @type {AppState} */
    const state = (await chromeStorageSync.get()) ?? initialState;

    async function broadcastStateUpdate() {
        // @ts-expect-error
        await chrome.runtime.sendMessage({ type: "APP_STATE_UPDATE", state });
    }

    return {
        getHeaderOverrides() {
            return state.headerOverrides;
        },

        async addHeaderOverride(data) {
            const newHeaderOverrides = [...state.headerOverrides, { ...data, id: crypto.randomUUID() }];
            await chromeStorageSync.set({ ...state, headerOverrides: newHeaderOverrides });
            state.headerOverrides = newHeaderOverrides;
            await broadcastStateUpdate();
        },

        async removeHeaderOverride(id) {
            const newHeaderOverrides = state.headerOverrides.filter((headerOverride) => headerOverride.id !== id);
            await chromeStorageSync.set({ ...state, headerOverrides: newHeaderOverrides });
            state.headerOverrides = newHeaderOverrides;
            await broadcastStateUpdate();
        },

        async removeAllHeaderOverrides() {
            await chromeStorageSync.set({ ...state, headerOverrides: [] });
            state.headerOverrides = [];
            await broadcastStateUpdate();
        },

        async updateHeaderOverrideName(id, name) {
            const newHeaderOverrides = state.headerOverrides.map((headerOverride) => {
                if (headerOverride.id === id) {
                    return { ...headerOverride, name };
                }
                return headerOverride;
            });
            await chromeStorageSync.set({ ...state, headerOverrides: newHeaderOverrides });
            state.headerOverrides = newHeaderOverrides;
            await broadcastStateUpdate();
        },

        async updateHeaderOverrideValue(id, value) {
            const newHeaderOverrides = state.headerOverrides.map((headerOverride) => {
                if (headerOverride.id === id) {
                    return { ...headerOverride, value };
                }
                return headerOverride;
            });
            await chromeStorageSync.set({ ...state, headerOverrides: newHeaderOverrides });
            state.headerOverrides = newHeaderOverrides;
            await broadcastStateUpdate();
        },

        async toggleHeaderOverride(id) {
            const newHeaderOverrides = state.headerOverrides.map((headerOverride) => {
                if (headerOverride.id === id) {
                    return { ...headerOverride, active: !headerOverride.active };
                }
                return headerOverride;
            });
            await chromeStorageSync.set({ ...state, headerOverrides: newHeaderOverrides });
            state.headerOverrides = newHeaderOverrides;
            await broadcastStateUpdate();
        },
    };
}

export { createStateService };
