import {locateNesteKnapp, locateRadioPanel} from '../../utils/utils';
import {Page, TestInfo} from "@playwright/test";
import {NeiSvar, norskTekst} from "../../utils/tekster";
import {Steg, testSideMedScreenshot} from "../../sideTest";

const TestSteg6 = async (page: Page, testInfo: TestInfo) => testSideMedScreenshot(page, testInfo, Steg.DIN_SITUASJON, async page => {
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

});

export default TestSteg6;
