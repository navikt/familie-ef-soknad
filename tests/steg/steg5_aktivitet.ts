import {locateNesteKnapp, locateRadioPanel, norskTekst} from '../utils';
import {Page} from "@playwright/test";

const TestSteg5 = async (page: Page) => {
    // Radiopanel er helt greit nå når vi kun velger et alternativ. Må lage en testkomponent som tillater flere svarsalternativer
    await locateRadioPanel(
        page,
        norskTekst('arbeidssituasjon.spm'),
        norskTekst(
            'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker'
        )
    ).click();

    await locateNesteKnapp(page).click()
};

export default TestSteg5;
