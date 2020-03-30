import { ESvar, ISvar } from '../models/spørsmalogsvar';
import { IntlShape } from 'react-intl';

export const hentBooleanFraValgtSvar = (valgtSvar: ISvar) =>
  valgtSvar.id === ESvar.JA;

export const erValgtSvarLiktSomSvar = (
  valgtSvar: string | undefined,
  annetSvarTekstid: string,
  intl: IntlShape
) => {
  return valgtSvar === intl.formatMessage({ id: annetSvarTekstid });
};
