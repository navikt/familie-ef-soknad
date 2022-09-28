import {Page, TestInfo} from "@playwright/test";
import {Steg, testSideMedScreenshot} from "../sideTest";

const clickCheckbox = async (page: Page): Promise<void> =>
    page.click('.navds-checkbox__input')


const StartSøknad = async (page: Page, testInfo: TestInfo, medScreenshot: boolean = false) => {
    if(medScreenshot) {
        await testSideMedScreenshot(page, testInfo, Steg.START_SØKNAD, clickCheckbox)
    } else {
        await clickCheckbox(page)
    }
    await page.locator("button", {hasText: "Start søknad"}).click()
    
};

export default StartSøknad;
