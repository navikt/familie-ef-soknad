import TestSteg1 from "../steg/steg1_omdeg";
import TestSteg2 from "../steg/steg2_bosituasjon";
import TestSteg3 from "../steg/steg3_barnadine";
import TestSteg4 from "../steg/steg4_barnasbosted";
import TestSteg5 from "../steg/steg5_aktivitet";
import TestSteg6 from "../steg/steg6_dinsituasjon";
import TestSteg7 from "../steg/steg7_oppsummering";
import TestSteg8 from "../steg/steg8_dokumentasjon";
import StartSøknad from "../felles/StartSøknad";
import TestSteg9 from "../steg/steg9_kvittering";
import {testMedApiMocks} from "../testContext";
import {gåTilOvergangsstønad} from "../utils/gåTilStønad";

testMedApiMocks('Send inn minimal søknad', async ({ page,  }, testInfo) => {
  await gåTilOvergangsstønad(page);

  // TODO trengs denne? Var det til for å få teste uten at appen kjører?
  await page.locator(".navds-checkbox__input").waitFor();

  await StartSøknad(page, testInfo, true)
  await TestSteg1(page, testInfo);
  await TestSteg2(page, testInfo);
  await TestSteg3(page, testInfo);
  await TestSteg4(page, testInfo);
  await TestSteg5(page, testInfo);
  await TestSteg6(page, testInfo);
  await TestSteg7(page, testInfo);
  await TestSteg8(page, testInfo);
  await TestSteg9(page, testInfo);

});
