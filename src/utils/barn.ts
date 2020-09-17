import { IntlShape } from 'react-intl';
import { hentTekst } from './søknad';
import { hentBeskjedMedNavn } from './språk';
import { IBarn } from '../models/steg/barn';
import { ESvar } from '../models/felles/spørsmålogsvar';
import { formatDate, strengTilDato } from './dato';

export const hentSpørsmålTekstMedNavnEllerBarn = (
  spørsmålTekstid: string,
  navnEllerBarn: string,
  intl: IntlShape
) => {
  return hentBeskjedMedNavn(navnEllerBarn, hentTekst(spørsmålTekstid, intl));
};

export const hentBarnetsNavnEllerBeskrivelseMedGenetiv = (
  barn: IBarn,
  intl: IntlShape
) => {
  const barnetsNavn = hentBarnetsNavnEllerBeskrivelse(barn, intl);
  return barn.navn.verdi ? `${barnetsNavn}s` : `${barnetsNavn} sitt`;
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

export const barnetsNavnEllerBarnet = (barn: IBarn, intl: IntlShape) => {
  return !barn.født || barn.navn.verdi === ''
    ? hentTekst('barnet.litenForBokstav', intl)
    : barn.navn.verdi;
};

export const flereBarnsNavn = (
  barneliste: IBarn[],
  intl: IntlShape
): string => {
  if (barneliste.length === 0) {
    return '';
  } else if (barneliste.length === 1) {
    return barnetsNavnEllerBarnet(barneliste[0], intl);
  } else {
    return barneliste.reduce((acc, barn, index, alleBarna) => {
      const navn = barnetsNavnEllerBarnet(barn, intl);
      switch (index) {
        case 0:
          return navn;
        case alleBarna.length - 1:
          return `${acc} og ${navn}`;
        default:
          return `${acc}, ${navn}`;
      }
    }, '');
  }
};
export const hentBarnNavnEllerBarnet = (
  barn: IBarn,
  tekstid: string,
  intl: IntlShape
) => {
  return hentBeskjedMedNavn(
    barnetsNavnEllerBarnet(barn, intl),
    hentTekst(tekstid, intl)
  );
};
