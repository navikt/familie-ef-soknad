import { RadioPanel, Input, NesteKnapp } from '../utils';
import { Selector, RequestMock, RequestLogger, ClientFunction } from 'testcafe';

const TestSteg2 = async (t) => {
  const DelerDuBolig = await RadioPanel(
    'Deler du bolig med andre voksne?',
    'Nei, jeg bor alene med barn eller jeg er gravid og bor alene'
  );

  await t.click(DelerDuBolig);
};

export default TestSteg2;
