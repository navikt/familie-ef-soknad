import { Locator, Page } from '@playwright/test';
import { ISpørsmål } from '../../src/models/felles/spørsmålogsvar';
import { norskTekst } from './tekster';

export const clickCheckBox = (
  page: Page,
  spørsmålstekst?: string
): Promise<void> => locateCheckBox(page, spørsmålstekst).click();

export const locateCheckBox = (page: Page, spørsmålstekst?: string): Locator =>
  page.locator('.skjemaelement__label', { hasText: spørsmålstekst });

export const clickRadioPanel = (
  page: Page,
  spørsmålstekst: string,
  svartekst: string
): Promise<void> => locateRadioPanel(page, spørsmålstekst, svartekst).click();

export const locateRadioPanel = (
  page: Page | Locator,
  spørsmålstekst: ISpørsmål | string,
  svartekst: string
): Locator => {
  const spmtekst =
    typeof spørsmålstekst === 'string'
      ? spørsmålstekst
      : norskTekst(spørsmålstekst.tekstid);
  return page
    .locator('fieldset', { hasText: spmtekst })
    .locator('label', { hasText: svartekst });
};

export const clickInput = (page: Page, spørsmålstekst: string): Promise<void> =>
  locateInput(page, spørsmålstekst).click();

export const locateLabel = (page: Page | Locator, tekstId: string) =>
  page.locator('label', { hasText: norskTekst(tekstId) });

export const locateInput = (page: Page, spørsmålstekst: string): Locator =>
  page.locator('.skjemaelement', { hasText: spørsmålstekst }); //TODO .withExactText(spørsmålstekst).find('input');

export const clickNesteKnapp = (page: Page): Promise<void> =>
  locateNesteKnapp(page).click();

export const locateNesteKnapp = (page: Page): Locator =>
  page.locator('button', { hasText: 'NESTE' });

export const clickSendSøknadKnapp = (page: Page): Promise<void> =>
  locateSendSøknadKnapp(page).click();

export const locateSendSøknadKnapp = (page: Page): Locator =>
  page.locator('button', { hasText: 'SEND SØKNAD' });

export const clickKnapp = async (page: Page | Locator, tekstId: string) =>
  await page.locator('button', { hasText: norskTekst(tekstId) }).click();
