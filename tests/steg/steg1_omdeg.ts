import {norskTekst, JaSvar, locateNesteKnapp, locateRadioPanel} from '../utils';
import {Page} from "@playwright/test";

const TestSteg1 = async (page: Page) => {
    await page.click('.navds-checkbox__input')
    await page.locator("button", {hasText: "Start søknad"}).click()

    await locateRadioPanel(page, norskTekst('personopplysninger.spm.riktigAdresse'), JaSvar).click();

    await locateRadioPanel(page, norskTekst('personopplysninger.spm.riktigAdresse'), JaSvar).click();

    await locateRadioPanel(
        page,
        norskTekst('sivilstatus.spm.begrunnelse'),
        norskTekst('sivilstatus.svar.aleneFraFødsel')
    ).click();

    await locateRadioPanel(page, norskTekst('medlemskap.spm.opphold'), JaSvar).click();

    await locateRadioPanel(page,norskTekst('medlemskap.spm.bosatt'), JaSvar).click();

    await locateNesteKnapp(page).click()
};

export default TestSteg1;
