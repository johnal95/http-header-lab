// @ts-check

import { render } from "./render.js";
import { createStateService } from "./state-service.js";

document.addEventListener("DOMContentLoaded", async () => {
    const stateService = await createStateService();
    render(stateService);
});
