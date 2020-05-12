import { IPerson } from '../models/person';

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
