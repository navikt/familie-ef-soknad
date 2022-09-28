import {locateRadioPanel} from '../utils/utils';
import {Page, TestInfo} from "@playwright/test";
import {norskTekst} from "../utils/tekster";
import {Steg, testSideMedScreenshot} from "../sideTest";

const TestSteg5 = async (page: Page, testInfo: TestInfo) => testSideMedScreenshot(page, testInfo, Steg.AKTIVITET, async page => {
    // Radiopanel er helt greit nå når vi kun velger et alternativ. Må lage en testkomponent som tillater flere svarsalternativer
    await locateRadioPanel(
        page,
        norskTekst('arbeidssituasjon.spm'),
        norskTekst(
            'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker'
        )
    ).click();
});

export default TestSteg5;
