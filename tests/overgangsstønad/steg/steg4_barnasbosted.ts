import {locateCheckBox, locateNesteKnapp, locateRadioPanel, } from '../../utils/utils';
import {Page, TestInfo} from "@playwright/test";
import {norskTekst} from "../../utils/tekster";
import {Steg, testSideMedScreenshot} from "../../sideTest";

const TestSteg4 = async (page: Page, testInfo: TestInfo) => {
    await testSideMedScreenshot(page, testInfo, Steg.BARNAS_BOSTED, async page => {
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
    });
    // Må klikke en eksta gang fordi den fortsatt er på barnsiden
    await locateNesteKnapp(page).click();
};

export default TestSteg4;
