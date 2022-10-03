import StartSøknad from '../felles/StartSøknad';
import { testMedApiMocks } from '../testContext';
import { gåTilOvergangsstønad } from '../utils/gåTilStønad';
import { Steg1, Steg1MedScreenshot } from './steg/steg1_omdeg';
import { Steg2MedScreenshot } from './steg/steg2_bosituasjon';
import { Steg3, Steg3MedScreenshot } from './steg/steg3_barnadine';
import { Steg9MedScreenshot } from './steg/steg9_kvittering';
import { Steg4MedScreenshot } from './steg/steg4_barnasbosted';
import { Steg5MedScreenshot } from './steg/steg5_aktivitet';
import { Steg6MedScreenshot } from './steg/steg6_dinsituasjon';
import { Steg7MedScreenshot } from './steg/steg7_oppsummering';
import { Steg8MedScreenshot } from './steg/steg8_dokumentasjon';

/*
viewport fra playwright config virker ikke?
testMedApiMocks.use({
  viewport: {
    width: 1024,
    height: 1800
  }
})
*/

testMedApiMocks(
  'Send inn minimal søknad med screenshots',
  async ({ page }, testInfo) => {
    await gåTilOvergangsstønad(page);

    // TODO trengs denne? Var det til for å få teste uten at appen kjører?
    await page.locator('.navds-checkbox__input').waitFor();

    await StartSøknad(page, testInfo, true);
    await Steg1MedScreenshot(page, testInfo);
    await Steg2MedScreenshot(page, testInfo);
    await Steg3MedScreenshot(page, testInfo);
    await Steg4MedScreenshot(page, testInfo);
    await Steg5MedScreenshot(page, testInfo);
    await Steg6MedScreenshot(page, testInfo);
    await Steg7MedScreenshot(page, testInfo);
    await Steg8MedScreenshot(page, testInfo);
    await Steg9MedScreenshot(page, testInfo);
  }
);
