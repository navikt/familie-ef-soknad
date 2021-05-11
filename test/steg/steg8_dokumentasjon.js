import { Selector } from 'testcafe';

const TestSteg8 = async (t) => {
  const SendSøknadKnapp = async () => {
    return Selector('button').withExactText('SEND SØKNAD');
  };
  await t.click(await SendSøknadKnapp());
};

export default TestSteg8;
