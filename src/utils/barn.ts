import { IntlShape } from 'react-intl';
import { hentTekst } from './søknad';
import { hentBeskjedMedNavn } from './språk';

export const hentSpørsmålTekstMedNavnEllerBarn = (
  spørsmålTekstid: string,
  navnEllerBarn: string,
  intl: IntlShape
) => {
  return hentBeskjedMedNavn(navnEllerBarn, hentTekst(spørsmålTekstid, intl));
};
