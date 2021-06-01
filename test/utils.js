import { Selector } from 'testcafe';
import tekster_nb from '../src/language/tekster_nb.ts';

export const RadioPanel = async (spørsmålstekst, svartekst) => {
  return Selector('legend')
    .withExactText(spørsmålstekst)
    .parent(0)
    .find('label')
    .withExactText(svartekst);
};

export const Input = async (spørsmålstekst) => {
  return Selector('.skjemaelement').withExactText(spørsmålstekst).find('input');
};

export const NesteKnapp = async () => {
  return Selector('button').withExactText('NESTE');
};

export const hentNorskTekst = (tekstid, navn) => {
  const tekst = tekster_nb[tekstid];
  const tekstMedNavn = navn && tekst.replace('[0]', navn);
  return navn ? tekstMedNavn : tekst;
};

export const barnetsNavn = 'Hei På Deg';

export const JaSvar = tekster_nb['svar.ja'];

export const NeiSvar = tekster_nb['svar.nei'];
