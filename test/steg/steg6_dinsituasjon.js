import { hentNorskTekst, NeiSvar, NesteKnapp, RadioPanel } from '../utils';

const TestSteg6 = async (t) => {
  const dinsituasjon = await RadioPanel(
    hentNorskTekst('dinSituasjon.spm'),
    NeiSvar
  );
  await t.click(dinsituasjon);

  const sagtOppEllerRedusert = await RadioPanel(
    hentNorskTekst('dinSituasjon.spm.sagtOppEllerRedusertStilling'),
    NeiSvar
  );
  await t.click(sagtOppEllerRedusert);

  const søkerBestemtMnd = await RadioPanel(
    hentNorskTekst('søkerFraBestemtMåned.spm.overgangsstønad'),
    hentNorskTekst('søkerFraBestemtMåned.svar.neiNavKanVurdere')
  );
  await t.click(søkerBestemtMnd);

  await t.click(await NesteKnapp());
};

export default TestSteg6;
