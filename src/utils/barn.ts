import { IntlShape } from 'react-intl';
import { hentTekst } from './søknad';
import { hentBeskjedMedNavn } from './språk';
import { IBarn } from '../models/barn';

export const hentSpørsmålTekstMedNavnEllerBarn = (
  spørsmålTekstid: string,
  navnEllerBarn: string,
  intl: IntlShape
) => {
  return hentBeskjedMedNavn(navnEllerBarn, hentTekst(spørsmålTekstid, intl));
};

export const hentBarnNavnEllerBarnet = (
  barn: IBarn,
  tekstid: string,
  intl: IntlShape
) => {
  return hentBeskjedMedNavn(
    !barn.født ? hentTekst('barnet.litenForBokstav', intl) : barn.navn.verdi,
    hentTekst(tekstid, intl)
  );
};
