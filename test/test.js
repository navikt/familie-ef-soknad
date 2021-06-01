import Steg1_OmDeg from './steg/steg1_omdeg.js';
import Steg2_Bosituasjon from './steg/steg2_bosituasjon.js';
import Steg3_BarnaDine from './steg/steg3_barnadine.js';
import Steg4_BarnasBosted from './steg/steg4_barnasbosted.js';
import Steg5_Aktivitet from './steg/steg5_aktivitet.js';
import Steg6_DinSituasjon from './steg/steg6_dinsituasjon.js';
import Steg7_Oppsummering from './steg/steg7_oppsummering.js';
import Steg8_Dokumentasjon from './steg/steg8_dokumentasjon.js';

fixture`Overgangsstønad`
  .page`http://localhost:3000/familie/alene-med-barn/soknad`;

test('Send inn minimal søknad', async (t) => {
  await Steg1_OmDeg(t);
  await Steg2_Bosituasjon(t);
  await Steg3_BarnaDine(t);
  await Steg4_BarnasBosted(t);
  await Steg5_Aktivitet(t);
  await Steg6_DinSituasjon(t);
  await Steg7_Oppsummering(t);
  await Steg8_Dokumentasjon(t);
});
