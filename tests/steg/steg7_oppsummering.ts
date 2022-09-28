import {Page, TestInfo} from "@playwright/test";
import {Steg, testSideMedScreenshot} from "../sideTest";

const TestSteg7 = async (page: Page, testInfo: TestInfo) =>
    testSideMedScreenshot(page, testInfo, Steg.OPPSOMMERING)

export default TestSteg7;
