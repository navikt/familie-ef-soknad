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
    case 'SEPR':
      return 'Separert';

    case 'SKIL':
      return 'Skilt';

    case 'ENKE':
      return 'Enke/ enkemann';

    default:
      return 'Annen sivilstatus enn GIFT, UGIF, SAMB, SEPA, SKIL, SEPR';
  }
};

export const hentSøkersTlfnr = (søker: IPerson): string => {
  const { kontakttelefon } = søker.søker;
  return kontakttelefon && kontakttelefon.trim() !== '' ? kontakttelefon : '';
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
    årsakEnslig,
  } = sivilstatus;

  const valgtBegrunnelse = årsakEnslig?.svarid;

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
  }
};
