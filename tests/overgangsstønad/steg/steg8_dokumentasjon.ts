import {Page, TestInfo} from "@playwright/test";
import {Steg, testSideMedScreenshot} from "../../sideTest";
import {clickSendSøknadKnapp} from "../../utils/utils";

const TestSteg8 = async (page: Page, testInfo: TestInfo) =>
    testSideMedScreenshot(page, testInfo, Steg.DOKUMENTASJON, async page => {
        await clickSendSøknadKnapp(page)
    })

export default TestSteg8;
