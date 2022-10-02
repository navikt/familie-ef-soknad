import {locateRadioPanel} from '../utils/utils';
import {expect, Page, TestInfo} from "@playwright/test";
import {JaSvar, NeiSvar, norskTekst} from "../utils/tekster";
import {screenshotPrefix, Steg, testSideMedScreenshot} from "../sideTest";
import {BegrunnelseSpørsmål} from "../../src/søknad/steg/1-omdeg/sivilstatus/SivilstatusConfig";
import {LokalIntlShape} from "../../src/language/typer";
import {bosattINorgeDeSisteTreÅr, oppholderSegINorge} from "../../src/søknad/steg/1-omdeg/medlemskap/MedlemskapConfig";

/*import {tekster_nb} from "../../src/language/tekster_nb";

const jaNei: (keyof typeof tekster_nb)[] = ['svar.ja', 'svar.ja']

const spmconfig: Partial<Record<keyof typeof tekster_nb, (keyof typeof tekster_nb)[]>> = {
    'personopplysninger.spm.riktigAdresse': jaNei
}
*/
/*
const config = [
    borDuPåDenneAdressen,
    BegrunnelseSpørsmål
]
*/
const intl: LokalIntlShape = {formatMessage: (props => props.id as string), messages: {}};

const steg = Steg.OM_DEG;

let begrunnelse = BegrunnelseSpørsmål(intl);

const TestSteg1 = async (page: Page, testInfo: TestInfo) => testSideMedScreenshot(page, testInfo, steg, async page => {
    await locateRadioPanel(page, norskTekst('personopplysninger.spm.riktigAdresse'), JaSvar).click();

    await TestSteg1MedAlleSvarsalternativ(page, testInfo)
    await OppholdNorgeNeiSvar(page, testInfo)

    await locateRadioPanel(
        page,
        begrunnelse,
        norskTekst('sivilstatus.svar.aleneFraFødsel')
    ).click();

    await locateRadioPanel(page, oppholderSegINorge(intl), JaSvar).click();
    await locateRadioPanel(page, bosattINorgeDeSisteTreÅr(intl), JaSvar).click();
});

const OppholdNorgeNeiSvar = async (page: Page, testInfo: TestInfo) => {
    let oppholdNorge = page.locator("fieldset", {hasText: norskTekst(oppholderSegINorge(intl).tekstid)});
    const oppholdINorgeSection = page.locator("section", {has: oppholdNorge})
    await locateRadioPanel(oppholdINorgeSection, oppholderSegINorge(intl), NeiSvar).click();
    await locateRadioPanel(oppholdINorgeSection, bosattINorgeDeSisteTreÅr(intl), NeiSvar).click();
    await expect(oppholdINorgeSection).toHaveScreenshot(`${screenshotPrefix(testInfo, steg)}-opphold-section-nejsvar.png`)
}

const SamlivsbruddMedKalender = async (page: Page, testInfo: TestInfo) => {
    await locateRadioPanel(
        page,
        begrunnelse,
        norskTekst('sivilstatus.svar.samlivsbruddForeldre')
    ).click();

    const datoForSamlivsbrudd = page.locator("div [class^='Datovelger__']", {hasText: "Dato for samlivsbrudd"});
    const input = datoForSamlivsbrudd.locator("input");
    await input.fill("01.01.2021");
    await datoForSamlivsbrudd.click(); // må klikke utenfor kalendern for at den skal trigge oppdatering av input-state
    await datoForSamlivsbrudd.locator("button").click()
    let parent = datoForSamlivsbrudd.locator("..");
    await expect(parent).toHaveScreenshot(`${screenshotPrefix(testInfo, steg)}-samlivsbrudd-kalender.png`)
}

const TestSteg1MedAlleSvarsalternativ = async (page: Page, testInfo: TestInfo) => {
    let skjemagruppe = page.locator("fieldset.skjemagruppe", {hasText: norskTekst(begrunnelse.tekstid)});
    let section = page.locator('section', {has: skjemagruppe});

    await expect(section).toHaveScreenshot();

    for (const svar of begrunnelse.svaralternativer) {
        const svarLocator = section.locator("label", {hasText: norskTekst(svar.svar_tekst)});
        await svarLocator.click()
        await expect(section).toHaveScreenshot(`${screenshotPrefix(testInfo, steg)}-begrunnelse-${svar.id}.png`);
        if(svar.svar_tekst === 'sivilstatus.svar.samlivsbruddForeldre') {
            await SamlivsbruddMedKalender(page, testInfo)
        }
    }
}

export default TestSteg1;
