import {locateRadioPanel} from '../utils/utils';
import {Page, TestInfo} from "@playwright/test";
import {JaSvar, norskTekst} from "../utils/tekster";
import {Steg, testSideMedScreenshot} from "../sideTest";

const TestSteg1 = async (page: Page, testInfo: TestInfo) => testSideMedScreenshot(page, testInfo, Steg.OM_DEG, async page => {
    await locateRadioPanel(page, norskTekst('personopplysninger.spm.riktigAdresse'), JaSvar).click();

    await locateRadioPanel(
        page,
        norskTekst('sivilstatus.spm.begrunnelse'),
        norskTekst('sivilstatus.svar.aleneFraFødsel')
    ).click();

    await locateRadioPanel(page, norskTekst('medlemskap.spm.opphold'), JaSvar).click();

    await locateRadioPanel(page, norskTekst('medlemskap.spm.bosatt'), JaSvar).click();

});

export default TestSteg1;
