import {Page} from "@playwright/test";

export const mockRoutes = async (page: Page) => {
    await mockSendInnSoknad(page);
}

export const mockSendInnSoknad = async (page: Page) => {
    await page.route('**/api/soknad', route => {
        // Runs last.
        route.fulfill({
            body: JSON.stringify({
                text: "Ok",
                mottattDato: "2022-01-01T01:01:01"
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
    });
}