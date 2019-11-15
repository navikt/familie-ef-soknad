import { ISpørsmål, ISvar } from '../models/spørsmal';
import { ISøknad } from '../models/søknad';

export const hentSvar = (
  spørsmål: ISpørsmål,
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

export const hentTekstidTilJaNeiSvar = (svar: ISvar) => {
  return svar === ISvar.JA ? 'svar.ja' : 'svar.nei';
};
