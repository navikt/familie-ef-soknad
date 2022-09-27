import tekster_nb from '../src/language/tekster_nb';
import {Locator, Page} from "@playwright/test";

export const locateCheckBox = (page: Page, spørsmålstekst): Locator =>
    page.locator('.skjemaelement__label', {hasText: spørsmålstekst})

export const locateRadioPanel = (page: Page, spørsmålstekst: string, svartekst: string): Locator =>
    page.locator("fieldset", {hasText: spørsmålstekst})
        .locator("label", {hasText: svartekst})

export const locateInput = async (page: Page, spørsmålstekst: string) =>
    page.locator('.skjemaelement', {hasText: spørsmålstekst}) //TODO .withExactText(spørsmålstekst).find('input');

export const locateNesteKnapp = (page: Page) =>
    page.locator('button', {hasText: 'NESTE'});

export const locateSendSøknadKnapp = (page: Page) =>
    page.locator('button', {hasText: 'SEND SØKNAD'})

export const norskTekst = (tekstid: string, navn?: string) => {
  const tekst = tekster_nb[tekstid];
  const tekstMedNavn = navn && tekst.replace('[0]', navn);
  return navn ? tekstMedNavn : tekst;
};

export const barnetsNavn = 'Hei På Deg';

export const JaSvar = tekster_nb['svar.ja'];

export const NeiSvar = tekster_nb['svar.nei'];
