import {locateRadioPanel} from '../utils/utils';
import {Page, TestInfo} from "@playwright/test";
import {Steg, testSideMedScreenshot} from "../sideTest";
import {NeiSvar, norskTekst} from "../utils/tekster";

const TestSteg2 = async (page: Page, testInfo: TestInfo) => testSideMedScreenshot(page, testInfo, Steg.BOSITUASJON, async page => {
    await locateRadioPanel(
        page,
        norskTekst('bosituasjon.spm.delerSøkerBoligMedAndreVoksne'),
        norskTekst('bosituasjon.svar.borAleneMedBarnEllerGravid')
    ).click();

    await locateRadioPanel(
        page,
        norskTekst('bosituasjon.spm.skalSøkerGifteSegMedSamboer'),
        NeiSvar
    ).click();
});

export default TestSteg2;
