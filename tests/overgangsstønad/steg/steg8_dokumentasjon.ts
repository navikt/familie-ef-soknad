import { Page, TestInfo } from '@playwright/test';
import { screenshot, Steg } from '../../sideTest';
import { clickSendSøknadKnapp } from '../../utils/utils';

export const Steg8 = async (page: Page) => await clickSendSøknadKnapp(page);

export const Steg8MedScreenshot = async (page: Page, testInfo: TestInfo) => {
  await screenshot(page, testInfo, Steg.DOKUMENTASJON);
  await clickSendSøknadKnapp(page);
};
