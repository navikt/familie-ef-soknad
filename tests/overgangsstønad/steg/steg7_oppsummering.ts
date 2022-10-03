import { Page, TestInfo } from '@playwright/test';
import { Steg, testSideMedScreenshot } from '../../sideTest';
import { clickNesteKnapp } from '../../utils/utils';

export const Steg7 = async (page: Page) => await clickNesteKnapp(page);

export const Steg7MedScreenshot = async (page: Page, testInfo: TestInfo) =>
  testSideMedScreenshot(page, testInfo, Steg.OPPSOMMERING);
