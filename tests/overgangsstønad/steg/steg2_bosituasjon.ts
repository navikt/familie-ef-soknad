import { clickNesteKnapp, locateRadioPanel } from '../../utils/utils';
import { expect, Locator, Page, TestInfo } from '@playwright/test';
import { screenshotPrefix, Steg, testSideMedScreenshot } from '../../sideTest';
import { JaSvar, NeiSvar, norskTekst, testIntl } from '../../utils/tekster';
import {
  bosituasjonSvar,
  delerSøkerBoligMedAndreVoksne,
  skalSøkerGifteSegMedSamboer,
} from '../../../src/søknad/steg/2-bosituasjon/BosituasjonConfig';

const steg = Steg.BOSITUASJON;

const delerSøkerBoligMedAndreVoksneConfig =
  delerSøkerBoligMedAndreVoksne(testIntl);
const skalSøkerGifteSegMedSamboerConfig = skalSøkerGifteSegMedSamboer(testIntl);

export const Steg2 = async (page: Page, trykkNesteSteg: boolean = true) => {
  await clickDelerSøkerBoligMedAndreVoksne(page);
  await harDuKonkretePlanerOmÅGifteDegEllerBliSamboer(page);
  if (trykkNesteSteg) {
    await clickNesteKnapp(page);
  }
};

export const Steg2MedScreenshot = async (page: Page, testInfo: TestInfo) =>
  testSideMedScreenshot(page, testInfo, steg, async (page) => {
    await Steg2(page, false);
  });

export const Steg2AndreValg = async (page: Page, testInfo: TestInfo) => {
  await clickDelerSøkerBoligMedAndreVoksne(page);
  await harDuKonkretePlanerOmÅGifteDegEllerBliSamboer(page, JaSvar);
  let inneholdslocator = page.locator('div.innholdscontainer');
  await expect(inneholdslocator).toHaveScreenshot(
    `${screenshotPrefix(testInfo, steg)}-1-bor-alene-ja.png`
  );

  await tidligereSamboerFortsattRegistrertPåAdressen(
    page,
    inneholdslocator,
    testInfo
  );
};

async function clickDelerSøkerBoligMedAndreVoksne(
  page: Page,
  svarId: bosituasjonSvar = bosituasjonSvar.borAleneMedBarnEllerGravid
) {
  await locateRadioPanel(
    page,
    delerSøkerBoligMedAndreVoksneConfig,
    norskTekst(svarId)
  ).click();
}

async function harDuKonkretePlanerOmÅGifteDegEllerBliSamboer(
  page: Page,
  svartekst: string = NeiSvar
) {
  await locateRadioPanel(
    page,
    skalSøkerGifteSegMedSamboerConfig,
    svartekst
  ).click();
}

async function tidligereSamboerFortsattRegistrertPåAdressen(
  page: Page,
  inneholdslocator: Locator,
  testInfo: TestInfo
) {
  await clickDelerSøkerBoligMedAndreVoksne(
    page,
    bosituasjonSvar.tidligereSamboerFortsattRegistrertPåAdresse
  );
  await inneholdslocator.locator('label', { hasText: 'Navn' }).fill('Charlie');
  await inneholdslocator
    .locator('label', { hasText: norskTekst('person.checkbox.ident') })
    .click();
  await inneholdslocator
    .locator('label', {
      hasText: norskTekst('sivilstatus.datovelger.flyttetFraHverandre'),
    })
    .fill('01.01.2001');
  //await inneholdslocator.click();
  await expect(inneholdslocator).toHaveScreenshot(
    `${screenshotPrefix(testInfo, steg)}-6.png`
  );
}
