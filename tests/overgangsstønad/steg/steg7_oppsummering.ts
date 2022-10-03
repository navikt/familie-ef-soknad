import { Page, TestInfo } from '@playwright/test';
import { Steg, testSideMedScreenshot } from '../../sideTest';

const TestSteg7Minimal = async (page: Page, testInfo: TestInfo) =>
  testSideMedScreenshot(page, testInfo, Steg.OPPSOMMERING);

export default TestSteg7Minimal;
