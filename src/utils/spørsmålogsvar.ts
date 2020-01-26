import {
  IMultiSvar,
  IMultiSpørsmål,
  IJaNeiSpørsmål,
  IJaNeiSvar,
  ISvar,
} from '../models/spørsmal';
import { ISøknad } from '../models/søknad';
import { IntlShape } from 'react-intl';

export const returnerJaNeiSvar = (
  spørsmål: IJaNeiSpørsmål,
  svar: IJaNeiSvar,
  søknadobj: any
) => {
  for (const [key, value] of Object.entries(søknadobj)) {
    if (key === spørsmål.spørsmål_id && value !== undefined) {
      console.log('inni hent janeisvar', søknadobj, value, svar);
      return (
        (value && svar.svar_tekstid === ISvar.JA) ||
        (!value && svar.svar_tekstid === ISvar.NEI)
      );
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
