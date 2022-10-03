import { Page, TestInfo } from '@playwright/test';
import { screenshot, Steg } from '../../sideTest';

export const Steg9 = async (page: Page) =>
  await page.locator('div', { hasText: 'Kvittering' });

export const Steg9MedScreenshot = async (page: Page, testInfo: TestInfo) => {
  await screenshot(page, testInfo, Steg.KVITTERING);
};
