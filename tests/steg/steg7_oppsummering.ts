import {locateNesteKnapp} from '../utils';
import {Page} from "@playwright/test";

const TestSteg7 = async (page: Page) => {
  await locateNesteKnapp(page).click()
};

export default TestSteg7;
