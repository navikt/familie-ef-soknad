import { Selector } from 'testcafe';

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
