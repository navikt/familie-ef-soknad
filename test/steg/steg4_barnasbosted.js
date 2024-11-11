import {
  NesteKnapp,
  RadioPanel,
  hentNorskTekst,
  JaSvar,
  NeiSvar,
  barnetsNavn,
} from '../utils';
const TestSteg4 = async (t) => {
  const BorAnnenForelderINorge = await RadioPanel(
    hentNorskTekst('barnasbosted.borinorge', barnetsNavn),
    JaSvar
  );
  await t.click(BorAnnenForelderINorge);

  const AnnenForelderSamvær = await RadioPanel(
    hentNorskTekst(
      'barnasbosted.spm.harAnnenForelderSamværMedBarn',
      barnetsNavn
    ),
    hentNorskTekst('barnasbosted.spm.andreForelderenSamværNei')
  );
  await t.click(AnnenForelderSamvær);

  const SammeBoområde = await RadioPanel(
    hentNorskTekst('barnasbosted.spm.borAnnenForelderISammeHus', barnetsNavn),
    NeiSvar
  );
  await t.click(SammeBoområde);

  const BoddSammenFør = await RadioPanel(
    hentNorskTekst('barnasbosted.spm.boddsammenfør', barnetsNavn),
    NeiSvar
  );
  await t.click(BoddSammenFør);

  const HvorMyeSammen = await RadioPanel(
    hentNorskTekst('barnasbosted.spm.hvorMyeSammen', barnetsNavn),
    hentNorskTekst('barnasbosted.spm.møtesIkke')
  );
  await t.click(HvorMyeSammen);

  await t.click(await NesteKnapp());
  await t.click(await NesteKnapp());
};

export default TestSteg4;
