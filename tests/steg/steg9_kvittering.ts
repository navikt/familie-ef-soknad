import {Page, TestInfo} from "@playwright/test";
import {Steg, testSideMedScreenshot} from "../sideTest";
import {clickSendSøknadKnapp} from "../utils/utils";

const TestSteg9 = async (page: Page, testInfo: TestInfo) =>
    testSideMedScreenshot(page, testInfo, Steg.KVITTERING, async page => {
        await expect(page.locator(".abc")).toContain("asd")
    })

export default TestSteg9;
