import { hentTekst } from './søknad';
import { førsteBokstavStor, hentBeskjedMedNavn } from './språk';
import { IBarn } from '../models/steg/barn';
import { ESvar } from '../models/felles/spørsmålogsvar';
import { formatDate, strengTilDato } from './dato';
import { storeForbokstaver } from './tekst';
import { erForelderUtfylt } from '../helpers/steg/forelder';
import { LokalIntlShape } from '../language/typer';

export const hentSpørsmålTekstMedNavnEllerBarn = (
  spørsmålTekstid: string,
  navnEllerBarn: string,
  intl: LokalIntlShape
) => {
  return hentBeskjedMedNavn(navnEllerBarn, hentTekst(spørsmålTekstid, intl));
};

export const hentBarnetsNavnEllerBeskrivelse = (
  barn: IBarn,
  intl: LokalIntlShape
) => {
  if (barn.harAdressesperre) {
    return hentTekst('barnekort.normaltekst.barn', intl);
  }
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

export const barnetsNavnEllerBarnet = (barn: IBarn, intl: LokalIntlShape) => {
  return !barn.født || barn.navn.verdi === ''
    ? hentTekst('barnet.litenForBokstav', intl)
    : barn.navn.verdi;
};

export const flereBarnsNavn = (
  barneliste: IBarn[],
  intl: LokalIntlShape
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
  intl: LokalIntlShape
) => {
  return hentBeskjedMedNavn(
    barnetsNavnEllerBarnet(barn, intl),
    hentTekst(tekstid, intl)
  );
};

export const oppdaterBarneliste = (barneListe: IBarn[], nyttBarn: IBarn) => {
  const erEndringAvEksisterendeBarn =
    barneListe.findIndex((barn) => barn.id === nyttBarn.id) >= 0;
  if (erEndringAvEksisterendeBarn) {
    return barneListe.map((barn) =>
      barn.id === nyttBarn.id ? nyttBarn : barn
    );
  }
  return [...barneListe, nyttBarn];
};

export const formatterBarnetsNavn = (barn: IBarn) => {
  return (tekst: string) => {
    if (barn.navn.verdi) {
      return storeForbokstaver(tekst);
    }
    return førsteBokstavStor(tekst);
  };
};

export const hentIndexFørsteBarnSomIkkeErUtfylt = (barna: IBarn[]): number => {
  return barna.findIndex(
    (barn) => barn.forelder === undefined || !erForelderUtfylt(barn.forelder)
  );
};

export const antallBarnMedForeldreUtfylt = (barna: IBarn[]): number => {
  return barna.filter(
    (barn) => barn.forelder && erForelderUtfylt(barn.forelder)
  ).length;
};

export const oppdaterBarnLabels = (barn: IBarn[], intl: LokalIntlShape) => {
  const oppdaterteBarn = barn.map((barnet: any) => {
    const navnEllerBarn = barnetsNavnEllerBarnet(barnet, intl);

    const oppdatertBarn = { ...barnet };

    if (oppdatertBarn?.forelder) {
      Object.keys(oppdatertBarn.forelder).forEach((key) => {
        if (!oppdatertBarn.forelder[key]?.label) {
          return;
        }

        let labelMedNavnEllerBarnet = oppdatertBarn.forelder[key].label;

        labelMedNavnEllerBarnet = labelMedNavnEllerBarnet?.replace(
          '[0]',
          navnEllerBarn
        );

        oppdatertBarn.forelder[key].label = labelMedNavnEllerBarnet;
      });
    }

    return oppdatertBarn;
  });

  return oppdaterteBarn;
};
