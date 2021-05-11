import { hentNorskTekst, NeiSvar, NesteKnapp, RadioPanel } from '../utils';

const TestSteg2 = async (t) => {
  const DelerDuBolig = await RadioPanel(
    hentNorskTekst('bosituasjon.spm.delerSøkerBoligMedAndreVoksne'),
    hentNorskTekst('bosituasjon.svar.borAleneMedBarnEllerGravid')
  );

  await t.click(DelerDuBolig);

  const KonkretePlaner = await RadioPanel(
    hentNorskTekst('bosituasjon.spm.skalSøkerGifteSegMedSamboer'),
    NeiSvar
  );

  await t.click(KonkretePlaner);

  await t.click(await NesteKnapp());
};

export default TestSteg2;
