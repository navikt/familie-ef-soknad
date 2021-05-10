import Steg1 from './steg/steg1.js';
import Steg2 from './steg/steg2.js';
import Steg3 from './steg/steg3.js';
import Steg4 from './steg/steg4';

fixture`Overgangsstønad`
  .page`http://localhost:3000/familie/alene-med-barn/soknad`;

test('Start søknad', async (t) => {
  await Steg1(t);

  await Steg2(t);

  await Steg3(t);

  await Steg4(t);
});
