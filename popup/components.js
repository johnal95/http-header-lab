// @ts-check

/**
 * @param {object} [props]
 * @param {boolean} [props.isChecked]
 * @param {(checked: boolean) => unknown} [props.onChange]
 * @returns {HTMLInputElement}
 */
function createCheckBoxInput({ isChecked = false, onChange } = {}) {
    const el = document.createElement("input");
    el.type = "checkbox";
    // @ts-expect-error
    el.addEventListener("change", (e) => onChange?.(e.target.checked));
    el.checked = isChecked;
    return el;
}

/**
 * @param {object} [props]
 * @param {string} [props.value]
 * @param {(value: string) => unknown} [props.onChange]
 * @returns {HTMLInputElement}
 */
function createTextInput({ value = "", onChange } = {}) {
    const el = document.createElement("input");
    el.type = "text";
    // @ts-expect-error
    el.addEventListener("input", (e) => onChange?.(e.target.value));
    el.value = value;
    return el;
}

/**
 * @param {object} [props]
 * @param {string} [props.textContent]
 * @param {(event: Event) => unknown} [props.onClick]
 * @returns {HTMLButtonElement}
 */
function createButton({ textContent = "", onClick } = {}) {
    const el = document.createElement("button");
    el.onclick = (e) => onClick?.(e);
    el.textContent = textContent;
    return el;
}

/**
 * @param {object} [props]
 * @param {string} [props.className]
 * @param {HTMLElement[]} [props.children]
 * @returns {HTMLDivElement}
 */
function createDiv({ className = "", children } = {}) {
    const el = document.createElement("div");
    el.className = className;
    children?.forEach((child) => {
        el.appendChild(child);
    });
    return el;
}

export { createButton, createCheckBoxInput, createDiv, createTextInput };
