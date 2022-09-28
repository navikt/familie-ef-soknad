import {Page} from "@playwright/test";

export const mockRoutes = async (page: Page) => {
    await mockSendInnSoknad(page);
}

export const mockSendInnSoknad = async (page: Page) => {
    await page.route('**/soknad', route => {
        console.log(route.request().url());
        // Runs last.
        route.fulfill({
            body: "",
            headers: {
                'content-type': 'application/json'
            }
        });
    });
}