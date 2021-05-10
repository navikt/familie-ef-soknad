import { NesteKnapp, RadioPanel } from '../utils';

const TestSteg4 = async (t) => {
  const BorAnnenForelderINorge = await RadioPanel(
    'Bor Hei På Degs andre forelder i Norge?',
    'Ja'
  );
  await t.click(BorAnnenForelderINorge);

  const SkriftligAvtaleDeltBosted = await RadioPanel(
    'Har du og den andre forelderen skriftlig avtale om delt bosted for Hei På Deg?',
    'Nei'
  );
  await t.click(SkriftligAvtaleDeltBosted);

  const AnnenForelderSamvær = await RadioPanel(
    'Har den andre forelderen samvær med Hei På Deg?',
    'Nei, den andre forelderen har ikke samvær med barnet'
  );
  await t.click(AnnenForelderSamvær);

  const SammeBoområde = await RadioPanel(
    'Bor du og den andre forelderen til Hei På Deg i samme hus, blokk, gårdstun, kvartal eller vei/gate?',
    'Nei'
  );
  await t.click(SammeBoområde);

  const BoddSammenFør = await RadioPanel(
    'Har du bodd sammen med den andre forelderen til Hei På Deg før?',
    'Nei'
  );
  await t.click(BoddSammenFør);

  const HvorMyeSammen = await RadioPanel(
    'Hvor mye er du sammen med den andre forelderen til Hei På Deg?',
    'Vi møtes ikke'
  );
  await t.click(HvorMyeSammen);

  await t.click(await NesteKnapp());
  await t.click(await NesteKnapp());
};

export default TestSteg4;
