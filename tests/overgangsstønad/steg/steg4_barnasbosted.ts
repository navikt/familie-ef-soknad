import {
  clickNesteKnapp,
  locateCheckBox,
  locateRadioPanel,
} from '../../utils/utils';
import { Page, TestInfo } from '@playwright/test';
import { norskTekst } from '../../utils/tekster';
import { Steg, testSideMedScreenshot } from '../../sideTest';

const Steg4 = async (page: Page, trykkNesteSteg: boolean = true) => {
  await locateCheckBox(
    page,
    norskTekst('barnasbosted.kanikkeoppgiforelder')
  ).click();

  await locateRadioPanel(
    page,
    norskTekst('barnasbosted.spm.hvorforikkeoppgi'),
    norskTekst('barnasbosted.spm.donorbarn')
  ).click();
  if (trykkNesteSteg) {
    await clickNesteKnapp(page);
    await clickNesteKnapp(page);
  }
};

export const Steg4MedScreenshot = async (page: Page, testInfo: TestInfo) => {
  await testSideMedScreenshot(
    page,
    testInfo,
    Steg.BARNAS_BOSTED,
    async (page) => {
      await Steg4(page, false);
    }
  );
  // Må klikke en eksta gang fordi den fortsatt er på barnsiden
  await clickNesteKnapp(page);
};

/*
await locateRadioPanel(
    page,
  norskTekst('barnasbosted.borinorge', barnetsNavn),
  JaSvar
).click()

await locateRadioPanel(
    page,
  norskTekst('barnasbosted.avtale', barnetsNavn),
  NeiSvar
).click()

await locateRadioPanel(
    page,
  norskTekst('barnasbosted.spm.harAnnenForelderSamværMedBarn', barnetsNavn),
  norskTekst('barnasbosted.spm.andreForelderenSamværNei')
).click();

await locateRadioPanel(
    page,
  norskTekst('barnasbosted.spm.borAnnenForelderISammeHus', barnetsNavn),
  NeiSvar
).click()

await locateRadioPanel(
    page,
  norskTekst('barnasbosted.spm.boddsammenfør', barnetsNavn),
  NeiSvar
).click()

await locateRadioPanel(
    page,
  norskTekst('barnasbosted.spm.hvorMyeSammen', barnetsNavn),
  norskTekst('barnasbosted.spm.møtesIkke')
).click()
*/
