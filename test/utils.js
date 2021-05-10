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

export const hentNorskTekst = (tekstid) => {
  return tekster_nb[tekstid];
};

export const JaSvar = tekster_nb['svar.ja'];

export const NeiSvar = tekster_nb['svar.nei'];
