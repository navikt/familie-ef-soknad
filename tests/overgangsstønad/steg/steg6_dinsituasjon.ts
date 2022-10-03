import { clickNesteKnapp, locateRadioPanel } from '../../utils/utils';
import { Page, TestInfo } from '@playwright/test';
import { NeiSvar, norskTekst } from '../../utils/tekster';
import { Steg, testSideMedScreenshot } from '../../sideTest';

export const Steg6 = async (page: Page, trykkNesteSteg: boolean = true) => {
  await locateRadioPanel(page, norskTekst('dinSituasjon.spm'), NeiSvar).click();

  await locateRadioPanel(
    page,
    norskTekst('dinSituasjon.spm.sagtOppEllerRedusertStilling'),
    NeiSvar
  ).click();

  await locateRadioPanel(
    page,
    norskTekst('søkerFraBestemtMåned.spm.overgangsstønad'),
    norskTekst('søkerFraBestemtMåned.svar.neiNavKanVurdere')
  ).click();
  if (trykkNesteSteg) {
    await clickNesteKnapp(page);
  }
};

export const Steg6MedScreenshot = async (page: Page, testInfo: TestInfo) =>
  testSideMedScreenshot(page, testInfo, Steg.DIN_SITUASJON, async (page) => {
    await Steg6(page, false);
  });
