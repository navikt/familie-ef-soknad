import { Page, TestInfo } from '@playwright/test';
import { screenshot, Steg } from '../../sideTest';

const TestSteg9Minimal = async (page: Page, testInfo: TestInfo) => {
  await screenshot(page, testInfo, Steg.KVITTERING);
};

export default TestSteg9Minimal;
