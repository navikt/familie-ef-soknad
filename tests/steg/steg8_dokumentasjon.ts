import {Page} from "@playwright/test";
import {locateSendSøknadKnapp} from "../utils";

const TestSteg8 = async (page: Page) => {
  await locateSendSøknadKnapp(page).click()
};

export default TestSteg8;
