import {barnetsNavn, JaSvar, locateCheckBox, locateNesteKnapp, locateRadioPanel, NeiSvar, norskTekst,} from '../utils';
import {Page} from "@playwright/test";

const TestSteg4 = async (page: Page) => {
    await locateCheckBox(page, norskTekst('barnasbosted.kanikkeoppgiforelder')).click();

    await locateRadioPanel(
        page,
        norskTekst('barnasbosted.spm.hvorforikkeoppgi'),
        norskTekst('barnasbosted.spm.donorbarn')
    ).click();
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
    await locateNesteKnapp(page).click();
    await locateNesteKnapp(page).click();
};

export default TestSteg4;
