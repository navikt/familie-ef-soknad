import StartSøknad from '../felles/StartSøknad';
import { testMedApiMocks } from '../testContext';
import { gåTilOvergangsstønad } from '../utils/gåTilStønad';
import {
  Steg1,
  Steg1MedAndreValg,
  Steg1MedScreenshot,
} from './steg/steg1_omdeg';
import { Steg2AndreValg, Steg2MedScreenshot } from './steg/steg2_bosituasjon';
import { Steg3, Steg3MedScreenshot } from './steg/steg3_barnadine';
import { Steg9MedScreenshot } from './steg/steg9_kvittering';
import { Steg4MedScreenshot } from './steg/steg4_barnasbosted';
import { Steg5MedScreenshot } from './steg/steg5_aktivitet';
import { Steg6MedScreenshot } from './steg/steg6_dinsituasjon';
import { Steg7MedScreenshot } from './steg/steg7_oppsummering';
import { Steg8MedScreenshot } from './steg/steg8_dokumentasjon';

testMedApiMocks('Steg 2', async ({ page }, testInfo) => {
  await gåTilOvergangsstønad(page);

  // TODO trengs denne? Var det til for å få teste uten at appen kjører?
  await page.locator('.navds-checkbox__input').waitFor();

  await StartSøknad(page, testInfo);
  await Steg1(page);
  await Steg2AndreValg(page, testInfo);
});
