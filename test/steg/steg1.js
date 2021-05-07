import { RadioPanel, Input, NesteKnapp } from '../utils';
import { Selector, RequestMock, RequestLogger, ClientFunction } from 'testcafe';

const TestSteg1 = async (t) => {
  await t
    .click('.skjemaelement__input.checkboks')

    .click('.knapp.knapp--hoved');

  const BorDuPåDenneAdressenJa = await RadioPanel(
    'Bor du på denne adressen?',
    'Ja'
  );

  await t.click(BorDuPåDenneAdressenJa);

  const Telefonnummer = await Input('Telefonnummer du kan kontaktes på');

  await t.typeText(Telefonnummer, '12345678');

  const HvorforAlene = await RadioPanel(
    'Hvorfor er du alene med barn?',
    'Jeg er alene med barn fra fødsel'
  );

  await t.click(HvorforAlene);

  const OppholderINorge = await RadioPanel(
    'Oppholder du og barnet/barna dere i Norge?',
    'Ja'
  );

  await t.click(OppholderINorge);

  const BoddINorge = await RadioPanel(
    'Har du bodd i Norge de siste fem årene?',
    'Ja'
  );

  await t.click(BoddINorge);

  await t.click(await NesteKnapp());
};

export default TestSteg1;
