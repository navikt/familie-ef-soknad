import { test, expect } from '@playwright/test';
import TestSteg1 from "./steg/steg1_omdeg";
import TestSteg2 from "./steg/steg2_bosituasjon";
import TestSteg3 from "./steg/steg3_barnadine";
import TestSteg4 from "./steg/steg4_barnasbosted";
import TestSteg5 from "./steg/steg5_aktivitet";
import TestSteg6 from "./steg/steg6_dinsituasjon";
import TestSteg7 from "./steg/steg7_oppsummering";
import TestSteg8 from "./steg/steg8_dokumentasjon";

test('Send inn minimal søknad', async ({ page }) => {
  await page.goto('http://localhost:3000/familie/alene-med-barn/soknad');

  await page.route('**/*', route => {
    // Runs last.
      route.fulfill({
          body: "",
          headers: {
              'content-type': 'application/json'
          }
      });
  });

  await TestSteg1(page);
  await TestSteg2(page);
  await TestSteg3(page);
  await TestSteg4(page);
  await TestSteg5(page);
  await TestSteg6(page);
  await TestSteg7(page);
  await TestSteg8(page);

});
