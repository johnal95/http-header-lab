// @ts-check

/** @import { StateService } from "../types.js" */

import { createButton, createCheckBoxInput, createDiv, createTextInput } from "./components.js";

/**
 * @param {string} id
 * @returns {HTMLElement}
 */
function getElementByIdOrThrow(id) {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`HTML element not found with ID: ${id}`);
    }
    return el;
}

/**
 * @param {StateService} stateService
 * @returns {void}
 */
function render(stateService) {
    const removeAllButton = getElementByIdOrThrow("remove-all-btn");
    removeAllButton.addEventListener("click", async () => {
        await stateService.removeAllHeaderOverrides();
        render(stateService);
    });

    const addNewButton = getElementByIdOrThrow("add-new-btn");
    addNewButton.addEventListener("click", async () => {
        await stateService.addHeaderOverride({ name: "", value: "", active: true });
        render(stateService);
    });

    const headersContainer = getElementByIdOrThrow("headers-container");

    /** @type {HTMLElement[]} */
    const headerOverrideElements = [];

    stateService.getHeaderOverrides().forEach((header, idx) => {
        const checkbox = createCheckBoxInput({
            isChecked: header.active,
            onChange: async () => {
                await stateService.toggleHeaderOverride(header.id);
            },
        });

        const nameInput = createTextInput({
            value: header.name,
            onChange: async (value) => {
                await stateService.updateHeaderOverrideName(header.id, value);
            },
        });

        const valueInput = createTextInput({
            value: header.value,
            onChange: async (value) => {
                await stateService.updateHeaderOverrideValue(header.id, value);
            },
        });

        const removeButton = createButton({
            textContent: "X",
            onClick: async () => {
                await stateService.removeHeaderOverride(header.id);
                render(stateService);
            },
        });

        const container = createDiv({
            className: "header-entry",
            children: [checkbox, nameInput, valueInput, removeButton],
        });

        headerOverrideElements.push(container);
    });

    headersContainer?.replaceChildren(...headerOverrideElements);
}

export { render };
