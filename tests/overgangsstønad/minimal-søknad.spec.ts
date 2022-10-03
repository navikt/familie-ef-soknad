import TestSteg1Minimal from './steg/steg1_omdeg';
import TestSteg2Minimal from './steg/steg2_bosituasjon';
import TestSteg3Minimal from './steg/steg3_barnadine';
import TestSteg4Minimal from './steg/steg4_barnasbosted';
import TestSteg5Minimal from './steg/steg5_aktivitet';
import TestSteg6Minimal from './steg/steg6_dinsituasjon';
import TestSteg7Minimal from './steg/steg7_oppsummering';
import TestSteg8Minimal from './steg/steg8_dokumentasjon';
import StartSøknad from '../felles/StartSøknad';
import TestSteg9Minimal from './steg/steg9_kvittering';
import { testMedApiMocks } from '../testContext';
import { gåTilOvergangsstønad } from '../utils/gåTilStønad';

/*
viewport fra playwright config virker ikke?
testMedApiMocks.use({
  viewport: {
    width: 1024,
    height: 1800
  }
})
*/

testMedApiMocks('Send inn minimal søknad', async ({ page }, testInfo) => {
  await gåTilOvergangsstønad(page);

  // TODO trengs denne? Var det til for å få teste uten at appen kjører?
  await page.locator('.navds-checkbox__input').waitFor();

  await StartSøknad(page, testInfo, true);
  await TestSteg1Minimal(page, testInfo);
  await TestSteg2Minimal(page, testInfo);
  await TestSteg3Minimal(page, testInfo);
  await TestSteg4Minimal(page, testInfo);
  await TestSteg5Minimal(page, testInfo);
  await TestSteg6Minimal(page, testInfo);
  await TestSteg7Minimal(page, testInfo);
  await TestSteg8Minimal(page, testInfo);
  await TestSteg9Minimal(page, testInfo);
});
