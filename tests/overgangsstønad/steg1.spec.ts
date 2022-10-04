import StartSøknad from '../felles/StartSøknad';
import { testMedApiMocks } from '../testContext';
import { gåTilOvergangsstønad } from '../utils/gåTilStønad';
import { Steg1MedAndreValg } from './steg/steg1_omdeg';

testMedApiMocks('Steg 1', async ({ page }, testInfo) => {
  await gåTilOvergangsstønad(page);

  // TODO trengs denne? Var det til for å få teste uten at appen kjører?
  await page.locator('.navds-checkbox__input').waitFor();

  await StartSøknad(page, testInfo);
  await Steg1MedAndreValg(page, testInfo);
});
