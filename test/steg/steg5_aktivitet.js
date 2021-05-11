import { hentNorskTekst, NesteKnapp, RadioPanel } from '../utils';

const TestSteg5 = async (t) => {
  // Radiopanel er helt greit nå når vi kun velger et alternativ. Må lage en testkomponent som tillater flere svarsalternativer
  const arbeidssituasjon = await RadioPanel(
    hentNorskTekst('arbeidssituasjon.spm'),
    hentNorskTekst(
      'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker'
    )
  );
  await t.click(arbeidssituasjon);

  await t.click(await NesteKnapp());
};

export default TestSteg5;
