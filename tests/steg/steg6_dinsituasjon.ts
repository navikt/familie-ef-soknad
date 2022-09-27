import {locateNesteKnapp, locateRadioPanel, NeiSvar, norskTekst} from '../utils';
import {Page} from "@playwright/test";

const TestSteg6 = async (page: Page) => {
    await locateRadioPanel(
        page,
        norskTekst('dinSituasjon.spm'),
        NeiSvar
    ).click();

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

    await locateNesteKnapp(page).click()
};

export default TestSteg6;
