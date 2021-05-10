import Steg1 from './steg/steg1.js';
import Steg2 from './steg/steg2.js';
import Steg3 from './steg/steg3.js';
import Steg4 from './steg/steg4.js';
import Steg5 from './steg/steg5.js';
import Steg6 from './steg/steg6.js';
import Steg7 from './steg/steg7.js';
import Steg8 from './steg/steg8.js';

fixture`Overgangsstønad`
  .page`http://localhost:3000/familie/alene-med-barn/soknad`;

test('Send inn minimal søknad', async (t) => {
  await Steg1(t);

  await Steg2(t);

  await Steg3(t);

  await Steg4(t);
  await Steg5(t);
  await Steg6(t);
  await Steg7(t);
  await Steg8(t);
});
