import { NesteKnapp, RadioPanel } from '../utils';

const TestSteg2 = async (t) => {
  const DelerDuBolig = await RadioPanel(
    'Deler du bolig med andre voksne?',
    'Nei, jeg bor alene med barn eller jeg er gravid og bor alene'
  );

  await t.click(DelerDuBolig);

  const KonkretePlaner = await RadioPanel(
    'Har du konkrete planer om å gifte deg eller bli samboer?',
    'Nei'
  );

  await t.click(KonkretePlaner);

  await t.click(await NesteKnapp());
};

export default TestSteg2;
