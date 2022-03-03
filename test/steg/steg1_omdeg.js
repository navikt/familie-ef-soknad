import {
  RadioPanel,
  Input,
  NesteKnapp,
  hentNorskTekst,
  JaSvar,
} from '../utils';

const TestSteg1 = async (t) => {
  await t
    .click('.skjemaelement__input.checkboks')

    .click('.knapp.knapp--hoved');

  const BorDuPåDenneAdressenJa = await RadioPanel(
    hentNorskTekst('personopplysninger.spm.riktigAdresse'),
    JaSvar
  );

  await t.click(BorDuPåDenneAdressenJa);

  const HvorforAlene = await RadioPanel(
    hentNorskTekst('sivilstatus.spm.begrunnelse'),
    hentNorskTekst('sivilstatus.svar.aleneFraFødsel')
  );

  await t.click(HvorforAlene);

  const OppholderINorge = await RadioPanel(
    hentNorskTekst('medlemskap.spm.opphold'),
    JaSvar
  );

  await t.click(OppholderINorge);

  const BoddINorge = await RadioPanel(
    hentNorskTekst('medlemskap.spm.bosatt'),
    JaSvar
  );

  await t.click(BoddINorge);

  await t.click(await NesteKnapp());
};

export default TestSteg1;
