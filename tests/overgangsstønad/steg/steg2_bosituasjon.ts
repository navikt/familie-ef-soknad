import { clickNesteKnapp, locateRadioPanel } from '../../utils/utils';
import { Page, TestInfo } from '@playwright/test';
import { Steg, testSideMedScreenshot } from '../../sideTest';
import { NeiSvar, norskTekst, testIntl } from '../../utils/tekster';
import {
  bosituasjonSvar,
  delerSøkerBoligMedAndreVoksne,
  skalSøkerGifteSegMedSamboer,
} from '../../../src/søknad/steg/2-bosituasjon/BosituasjonConfig';

const delerSøkerBoligMedAndreVoksneConfig =
  delerSøkerBoligMedAndreVoksne(testIntl);
const skalSøkerGifteSegMedSamboerConfig = skalSøkerGifteSegMedSamboer(testIntl);

export const TestSteg2 = async (page: Page, trykkNesteSteg: boolean = true) => {
  await borAleneMedBarnEllerGravid(page);
  await locateRadioPanel(
    page,
    skalSøkerGifteSegMedSamboerConfig,
    NeiSvar
  ).click();
  if (trykkNesteSteg) {
    await clickNesteKnapp(page);
  }
};

export const Steg2MedScreenshot = async (page: Page, testInfo: TestInfo) =>
  testSideMedScreenshot(page, testInfo, Steg.BOSITUASJON, async (page) => {
    await TestSteg2(page, false);
  });

/*
       bosituasjonSvar.borAleneMedBarnEllerGravid,
       bosituasjonSvar.borMidlertidigFraHverandre,
       bosituasjonSvar.borSammenOgVenterBarn,
       bosituasjonSvar.harEkteskapsliknendeForhold,
       bosituasjonSvar.delerBoligMedAndreVoksne,
       bosituasjonSvar.tidligereSamboerFortsattRegistrertPåAdresse,
    */

async function borAleneMedBarnEllerGravid(page: Page) {
  await locateRadioPanel(
    page,
    delerSøkerBoligMedAndreVoksneConfig,
    norskTekst(bosituasjonSvar.borAleneMedBarnEllerGravid)
  ).click();
}
