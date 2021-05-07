import { Selector, RequestMock, RequestLogger, ClientFunction } from 'testcafe';
import { RadioPanel, Input, NesteKnapp } from './utils';
import Steg1 from './steg/steg1.js';
import Steg2 from './steg/steg2.js';

fixture`Overgangsstønad`
  .page`http://localhost:3000/familie/alene-med-barn/soknad`;

test('Start søknad', async (t) => {
  await Steg1(t);

  await Steg2(t);
});
