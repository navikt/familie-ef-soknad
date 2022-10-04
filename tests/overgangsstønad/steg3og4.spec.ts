import StartSøknad from '../felles/StartSøknad';
import { testMedApiMocks } from '../testContext';
import { gåTilOvergangsstønad } from '../utils/gåTilStønad';
import { Steg1 } from './steg/steg1_omdeg';
import { Steg2 } from './steg/steg2_bosituasjon';
import { Steg3FlereValg } from './steg/steg3_barnadine';
import { Steg4MedFlereValg } from './steg/steg4_barnasbosted';

testMedApiMocks('Steg 3 og 4', async ({ page }, testInfo) => {
  await gåTilOvergangsstønad(page);

  // TODO trengs denne? Var det til for å få teste uten at appen kjører?
  await page.locator('.navds-checkbox__input').waitFor();

  await StartSøknad(page, testInfo);
  await Steg1(page);
  await Steg2(page);
  await Steg3FlereValg(page, testInfo);
  await Steg4MedFlereValg(page, testInfo);
});
