import { Page, TestInfo } from '@playwright/test';
import { screenshot, Steg } from '../../sideTest';
import { clickNesteKnapp } from '../../utils/utils';

const TestSteg3Minimal = async (page: Page, testInfo: TestInfo) => {
  await screenshot(page, testInfo, Steg.BARNA_DINE);
  await clickNesteKnapp(page);
};

export default TestSteg3Minimal;
