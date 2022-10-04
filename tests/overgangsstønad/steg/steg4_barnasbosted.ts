import {
  clickCheckBox,
  clickNesteKnapp,
  clickRadioPanel,
  locateLabel,
} from '../../utils/utils';
import { expect, Page, TestInfo } from '@playwright/test';
import {
  barnetsNavn,
  JaSvar,
  NeiSvar,
  norskTekst,
  testIntl,
} from '../../utils/tekster';
import { screenshotPrefix, Steg, testSideMedScreenshot } from '../../sideTest';
import { hvorforIkkeOppgi } from '../../../src/søknad/steg/4-barnasbosted/ForeldreConfig';

const steg = Steg.BARNAS_BOSTED;

const hvorforIkkeOppgiConfig = hvorforIkkeOppgi(testIntl);

export const Steg4 = async (page: Page, trykkNesteSteg: boolean = true) => {
  await markerBarnSomDonorBarn(page);
  if (trykkNesteSteg) {
    await clickNesteKnapp(page);
    await clickNesteKnapp(page);
  }
};

export const Steg4MedScreenshot = async (page: Page, testInfo: TestInfo) => {
  await testSideMedScreenshot(page, testInfo, steg, async (page) => {
    await Steg4(page, false);
  });
  // Må klikke en eksta gang fordi den fortsatt er på barnsiden
  await clickNesteKnapp(page);
};

async function markerBarnSomDonorBarn(page: Page) {
  await clickCheckBox(page, norskTekst('barnasbosted.kanikkeoppgiforelder'));
  await clickRadioPanel(
    page,
    hvorforIkkeOppgiConfig,
    norskTekst('barnasbosted.spm.donorbarn')
  );
}

export const Steg4MedFlereValg = async (page: Page, testInfo: TestInfo) => {
  const prefix = screenshotPrefix(testInfo, steg);

  await markerBarnSomDonorBarn(page);
  await expect(page).toHaveScreenshot(`${prefix}-donorbarn.png`, {
    fullPage: true,
  });
  await clickNesteKnapp(page);

  await Steg4Terminbarn(page, testInfo);
  await expect(page).toHaveScreenshot(`${prefix}-fyllt-begge-barnen.png`, {
    fullPage: true,
  });
  await clickNesteKnapp(page);
};

const Steg4Terminbarn = async (page: Page, testInfo: TestInfo) => {
  const navnLabel = locateLabel(page, 'person.navn');
  await navnLabel.fill('Dad');
  await navnLabel.click();
  await clickCheckBox(page, norskTekst('person.checkbox.ident'));
  const fødselsdatoLocator = locateLabel(page, 'person.fødselsdato');
  await fødselsdatoLocator.fill('02.03.2000');
  await fødselsdatoLocator.click();

  await clickRadioPanel(
    page,
    norskTekst('barnasbosted.borinorge', 'barnet'),
    JaSvar
  );
  await clickRadioPanel(
    page,
    norskTekst('barnasbosted.avtale.ufødt', barnetsNavn),
    JaSvar
  );
  await clickRadioPanel(
    page,
    norskTekst(
      'barnasbosted.spm.harAnnenForelderSamværMedBarn.ufødt',
      barnetsNavn
    ),
    norskTekst('barnasbosted.spm.andreForelderenSamværNei.ufødt')
  );
  await clickRadioPanel(
    page,
    norskTekst('barnasbosted.spm.borAnnenForelderISammeHus', barnetsNavn),
    NeiSvar
  );
  await clickRadioPanel(
    page,
    norskTekst('barnasbosted.spm.boddsammenfør', barnetsNavn),
    NeiSvar
  );
  await clickRadioPanel(
    page,
    norskTekst('barnasbosted.spm.hvorMyeSammen', barnetsNavn),
    norskTekst('barnasbosted.spm.møtesIkke')
  );

  const prefix = screenshotPrefix(testInfo, steg);
  await expect(page).toHaveScreenshot(`${prefix}-fyllt-i-terminbarn.png`, {
    fullPage: true,
  });

  await clickNesteKnapp(page);
};
