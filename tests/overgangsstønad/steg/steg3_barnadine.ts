import { expect, Page, TestInfo } from '@playwright/test';
import { screenshot, screenshotPrefix, Steg } from '../../sideTest';
import { clickKnapp, clickNesteKnapp, locateLabel } from '../../utils/utils';
import { formatDate } from '../../../src/utils/dato';

const steg = Steg.BARNA_DINE;

export const Steg3 = async (page: Page) => {
  await clickNesteKnapp(page);
};

export const Steg3MedScreenshot = async (page: Page, testInfo: TestInfo) => {
  await screenshot(page, testInfo, steg);
  await Steg3(page);
};

export const Steg3FlereValg = async (page: Page, testInfo: TestInfo) => {
  await leggTilBarnModal(page, testInfo);
  await screenshot(page, testInfo, steg);
  await clickNesteKnapp(page);
};

const leggTilBarnModal = async (page: Page, testInfo: TestInfo) => {
  const modal = page.locator('div[aria-label="Legg til barn"]');
  await clickKnapp(page, 'barnadine.leggtil');
  const date = datoImorgen();
  await locateLabel(page, 'barnekort.termindato').fill(formatDate(date));
  await modal.click();
  await modal.locator('label', { hasText: 'Ja' });
  await expect(modal).toHaveScreenshot(
    `${screenshotPrefix(testInfo, steg)}-leggTilBarnModal.png`
  );
  await clickKnapp(page, 'barnadine.leggtil');
};

const datoImorgen = () => {
  let date = new Date();
  date.setDate(date.getDate() + 2);
  return date;
};
