import { clickNesteKnapp, locateRadioPanel } from '../../utils/utils';
import { Page, TestInfo } from '@playwright/test';
import { norskTekst } from '../../utils/tekster';
import { Steg, testSideMedScreenshot } from '../../sideTest';

const Steg5 = async (page: Page, trykkNesteSteg: boolean = true) => {
  // Radiopanel er helt greit nå når vi kun velger et alternativ. Må lage en testkomponent som tillater flere svarsalternativer
  await locateRadioPanel(
    page,
    norskTekst('arbeidssituasjon.spm'),
    norskTekst(
      'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker'
    )
  ).click();
  if (trykkNesteSteg) {
    await clickNesteKnapp(page);
  }
};

export const Steg5MedScreenshot = async (page: Page, testInfo: TestInfo) =>
  testSideMedScreenshot(page, testInfo, Steg.AKTIVITET, async (page) => {
    await Steg5(page, false);
  });
