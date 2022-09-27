import {locateNesteKnapp, locateRadioPanel, NeiSvar, norskTekst} from '../utils';
import {Page} from "@playwright/test";

const TestSteg2 = async (page: Page) => {
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

    await locateNesteKnapp(page).click()
};

export default TestSteg2;
