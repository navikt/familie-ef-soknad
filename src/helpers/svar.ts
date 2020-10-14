import { ESvar, ESvarTekstid, ISvar } from '../models/felles/spørsmålogsvar';
import { IntlShape } from 'react-intl';

export const JaNeiSvar = (intl: IntlShape): ISvar[] => [
  JaSvar(intl),
  NeiSvar(intl),
];

export const NeiSvar = (intl: IntlShape): ISvar => ({
  id: ESvar.NEI,
  svar_tekst: intl.formatMessage({ id: ESvarTekstid.NEI }),
});
export const JaSvar = (intl: IntlShape): ISvar => ({
  id: ESvar.JA,
  svar_tekst: intl.formatMessage({ id: ESvarTekstid.JA }),
});
