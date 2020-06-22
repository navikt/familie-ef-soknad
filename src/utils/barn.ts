import { IntlShape } from 'react-intl';
import { hentTekst } from './søknad';
import { hentBeskjedMedNavn } from './språk';
import { IBarn } from '../models/barn';
import { ESvar } from '../models/spørsmålogsvar';
import { formatDate, strengTilDato } from './dato';

export const hentSpørsmålTekstMedNavnEllerBarn = (
  spørsmålTekstid: string,
  navnEllerBarn: string,
  intl: IntlShape
) => {
  return hentBeskjedMedNavn(navnEllerBarn, hentTekst(spørsmålTekstid, intl));
};

export const hentBarnetsNavnEllerBeskrivelse = (
  barn: IBarn,
  intl: IntlShape
) => {
  if (barn.navn && barn.navn.verdi) {
    return barn.navn.verdi;
  }
  if (!barn.fødselsdato.verdi) {
    return hentTekst('barnet.litenForBokstav', intl);
  }
  if (barn.født?.svarid === ESvar.JA) {
    return hentBeskjedMedNavn(
      formatDate(strengTilDato(barn.fødselsdato.verdi)),
      hentTekst('født.barn', intl)
    );
  }
  return hentBeskjedMedNavn(
    formatDate(strengTilDato(barn.fødselsdato.verdi)),
    hentTekst('ufødt.barn', intl)
  );
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
