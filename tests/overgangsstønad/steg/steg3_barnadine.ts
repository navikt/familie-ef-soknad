import { Page, TestInfo } from '@playwright/test';
import { screenshot, Steg } from '../../sideTest';
import { clickNesteKnapp } from '../../utils/utils';

export const Steg3 = async (page: Page) => {
  await clickNesteKnapp(page);
};

export const Steg3MedScreenshot = async (page: Page, testInfo: TestInfo) => {
  await screenshot(page, testInfo, Steg.BARNA_DINE);
  await Steg3(page);
};
