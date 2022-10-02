import {locateRadioPanel} from '../../utils/utils';
import {Page, TestInfo} from "@playwright/test";
import {Steg, testSideMedScreenshot} from "../../sideTest";
import {NeiSvar, norskTekst, testIntl} from "../../utils/tekster";
import {
    bosituasjonSvar,
    delerSøkerBoligMedAndreVoksne,
    skalSøkerGifteSegMedSamboer
} from "../../../src/søknad/steg/2-bosituasjon/BosituasjonConfig";

const delerSøkerBoligMedAndreVoksneConfig = delerSøkerBoligMedAndreVoksne(testIntl)
const skalSøkerGifteSegMedSamboerConfig = skalSøkerGifteSegMedSamboer(testIntl)

const TestSteg2Minimal = async (page: Page, testInfo: TestInfo) => testSideMedScreenshot(page, testInfo, Steg.BOSITUASJON, async page => {
    await borAleneMedBarnEllerGravid(page);
    await locateRadioPanel(
        page,
        skalSøkerGifteSegMedSamboerConfig,
        NeiSvar
    ).click();
});

/*
       bosituasjonSvar.borAleneMedBarnEllerGravid,
       bosituasjonSvar.borMidlertidigFraHverandre,
       bosituasjonSvar.borSammenOgVenterBarn,
       bosituasjonSvar.harEkteskapsliknendeForhold,
       bosituasjonSvar.delerBoligMedAndreVoksne,
       bosituasjonSvar.tidligereSamboerFortsattRegistrertPåAdresse,
    */

async function borAleneMedBarnEllerGravid(page: Page) {
    await locateRadioPanel(
        page,
        delerSøkerBoligMedAndreVoksneConfig,
        norskTekst(bosituasjonSvar.borAleneMedBarnEllerGravid)
    ).click();
}

export default TestSteg2Minimal;
