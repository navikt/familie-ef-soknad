import { IPerson } from '../models/person';
import { EBegrunnelse, ISivilstatus } from '../models/steg/omDeg/sivilstatus';

export const hentSivilstatus = (statuskode: string) => {
  switch (statuskode) {
    case 'GIFT':
      return 'Gift';

    case 'UGIF':
      return 'Ugift';

    case 'SAMB':
      return 'Samboer';

    case 'SEPA':
      return 'Separert';

    case 'SKIL':
      return 'Skilt';

    case 'ENKE':
      return 'Enke/ enkemann';

    default:
      return 'Annen sivilstatus enn GIFT, UGIF, SAMB, SEPA, SKIL';
  }
};

export const hentSøkersTlfnr = (søker: IPerson): string => {
  const { mobiltelefon, privattelefon, jobbtelefon } = søker.søker;
  return (
    [mobiltelefon, privattelefon, jobbtelefon].find(
      (nr) => nr && nr.trim() !== ''
    ) || ''
  );
};

export const harSøkerTlfnr = (søker: IPerson): boolean => {
  const telefonnr = hentSøkersTlfnr(søker).trim();
  return telefonnr !== '';
};

export const erSøknadsBegrunnelseBesvart = (sivilstatus: ISivilstatus) => {
  const {
    datoForSamlivsbrudd,
    datoFlyttetFraHverandre,
    datoEndretSamvær,
    begrunnelseAnnet,
    begrunnelseForSøknad,
  } = sivilstatus;

  const valgtBegrunnelse = begrunnelseForSøknad?.svarid;

  switch (valgtBegrunnelse) {
    case EBegrunnelse.samlivsbruddForeldre:
      return datoForSamlivsbrudd?.verdi !== undefined;
    case EBegrunnelse.samlivsbruddAndre:
      return datoFlyttetFraHverandre?.verdi !== undefined;
    case EBegrunnelse.endringISamværsordning:
      return datoEndretSamvær?.verdi !== undefined;
    case EBegrunnelse.aleneFraFødsel:
      return true;
    case EBegrunnelse.dødsfall:
      return true;
    case EBegrunnelse.annet:
      return begrunnelseAnnet?.verdi !== undefined;
  }
};
