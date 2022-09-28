import {Page} from "@playwright/test";


export const gåTilOvergangsstønad = (page: Page) =>
    page.goto('http://localhost:3000/familie/alene-med-barn/soknad');