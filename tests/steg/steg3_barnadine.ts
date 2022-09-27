import {locateNesteKnapp} from '../utils';
import {Page} from "@playwright/test";

const TestSteg3 = async (page: Page) => {
  await locateNesteKnapp(page).click()
};

export default TestSteg3;
