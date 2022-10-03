import { clickNesteKnapp, locateRadioPanel } from '../../utils/utils';
import { expect, Page, TestInfo } from '@playwright/test';
import { JaSvar, NeiSvar, norskTekst, testIntl } from '../../utils/tekster';
import { screenshotPrefix, Steg, testSideMedScreenshot } from '../../sideTest';
import { BegrunnelseSpørsmål } from '../../../src/søknad/steg/1-omdeg/sivilstatus/SivilstatusConfig';
import {
  bosattINorgeDeSisteTreÅr,
  oppholderSegINorge,
} from '../../../src/søknad/steg/1-omdeg/medlemskap/MedlemskapConfig';
import { borDuPåDenneAdressen } from '../../../src/søknad/steg/1-omdeg/personopplysninger/PersonopplysningerConfig';

/*import {tekster_nb} from "../../src/language/tekster_nb";

const jaNei: (keyof typeof tekster_nb)[] = ['svar.ja', 'svar.ja']

const spmconfig: Partial<Record<keyof typeof tekster_nb, (keyof typeof tekster_nb)[]>> = {
    'personopplysninger.spm.riktigAdresse': jaNei
}
*/
/*
const config = [
    borDuPåDenneAdressen,
    BegrunnelseSpørsmål
]
*/

const steg = Steg.OM_DEG;

const begrunnelse = BegrunnelseSpørsmål(testIntl);
const borDuPåDenneAdressenConfig = borDuPåDenneAdressen(testIntl);

export const Steg1 = async (page: Page, trykkNesteSteg: boolean = true) => {
  await locateRadioPanel(page, borDuPåDenneAdressenConfig, JaSvar).click();

  await locateRadioPanel(
    page,
    begrunnelse,
    norskTekst('sivilstatus.svar.aleneFraFødsel')
  ).click();

  await locateRadioPanel(page, oppholderSegINorge(testIntl), JaSvar).click();
  await locateRadioPanel(
    page,
    bosattINorgeDeSisteTreÅr(testIntl),
    JaSvar
  ).click();

  if (trykkNesteSteg) {
    await clickNesteKnapp(page);
  }
};

export const Steg1MedScreenshot = async (page: Page, testInfo: TestInfo) =>
  testSideMedScreenshot(page, testInfo, steg, async (page) => {
    await Steg1(page, false);
  });

const OppholdNorgeNeiSvar = async (page: Page, testInfo: TestInfo) => {
  let oppholdNorge = page.locator('fieldset', {
    hasText: norskTekst(oppholderSegINorge(testIntl).tekstid),
  });
  const oppholdINorgeSection = page.locator('section', { has: oppholdNorge });
  await locateRadioPanel(
    oppholdINorgeSection,
    oppholderSegINorge(testIntl),
    NeiSvar
  ).click();
  await locateRadioPanel(
    oppholdINorgeSection,
    bosattINorgeDeSisteTreÅr(testIntl),
    NeiSvar
  ).click();
  await expect(oppholdINorgeSection).toHaveScreenshot(
    `${screenshotPrefix(testInfo, steg)}-opphold-section-nejsvar.png`
  );
};

const SamlivsbruddMedKalender = async (page: Page, testInfo: TestInfo) => {
  await locateRadioPanel(
    page,
    begrunnelse,
    norskTekst('sivilstatus.svar.samlivsbruddForeldre')
  ).click();

  const datoForSamlivsbrudd = page.locator("div [class^='Datovelger__']", {
    hasText: 'Dato for samlivsbrudd',
  });
  const input = datoForSamlivsbrudd.locator('input');
  await input.fill('01.01.2021');
  await datoForSamlivsbrudd.click(); // må klikke utenfor kalendern for at den skal trigge oppdatering av input-state
  await datoForSamlivsbrudd.locator('button').click();
  let parent = datoForSamlivsbrudd.locator('..');
  await expect(parent).toHaveScreenshot(
    `${screenshotPrefix(testInfo, steg)}-samlivsbrudd-kalender.png`
  );
};

const TestSteg1MedAlleSvarsalternativ = async (
  page: Page,
  testInfo: TestInfo
) => {
  let skjemagruppe = page.locator('fieldset.skjemagruppe', {
    hasText: norskTekst(begrunnelse.tekstid),
  });
  let section = page.locator('section', { has: skjemagruppe });

  await expect(section).toHaveScreenshot();

  for (const svar of begrunnelse.svaralternativer) {
    const svarLocator = section.locator('label', {
      hasText: norskTekst(svar.svar_tekst),
    });
    await svarLocator.click();
    await expect(section).toHaveScreenshot(
      `${screenshotPrefix(testInfo, steg)}-begrunnelse-${svar.id}.png`
    );
    if (svar.svar_tekst === 'sivilstatus.svar.samlivsbruddForeldre') {
      await SamlivsbruddMedKalender(page, testInfo);
    }
  }
};
