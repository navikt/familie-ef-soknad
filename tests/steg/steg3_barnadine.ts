import {Page, TestInfo} from "@playwright/test";
import {Steg, testSideMedScreenshot} from "../sideTest";

const TestSteg3 = async (page: Page, testInfo: TestInfo) =>
    testSideMedScreenshot(page, testInfo, Steg.BARNA_DINE);

export default TestSteg3;
