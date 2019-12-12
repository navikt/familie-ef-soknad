import {
  IMultiSvar,
  IMultiSpørsmål,
  IJaNeiSpørsmål,
  ISvar,
} from '../models/spørsmal';
import { ISøknad } from '../models/søknad';
import { IntlShape } from 'react-intl';

export const returnerJaNeiSvar = (
  spørsmål: IJaNeiSpørsmål,
  svar: ISvar,
  søknadobj: ISøknad
) => {
  for (const [key, value] of Object.entries(søknadobj)) {
    if (key === spørsmål.spørsmål_id && value !== undefined) {
      return (value && svar === ISvar.JA) || (!value && svar === ISvar.NEI);
    }
  }
  return false;
};

export const returnerMultiSvar = (
  spørsmål: IMultiSpørsmål,
  svar: IMultiSvar,
  søknadobj: ISøknad,
  intl: IntlShape
) => {
  for (const [key, value] of Object.entries(søknadobj)) {
    if (key === spørsmål.spørsmål_id && value !== undefined) {
      const svartekst = intl.formatMessage({ id: svar.svar_tekstid });
      return value && svartekst === value;
    }
  }
  return false;
};

export const hentTekstidTilJaNeiSvar = (svar: ISvar) => {
  return svar === ISvar.JA ? 'svar.ja' : 'svar.nei';
};
