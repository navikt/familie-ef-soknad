import { Språk } from '../models/felles/språk';
import tekster_en from './tekster_en';
import tekster_nn from './tekster_nn';
import tekster_nb from './tekster_nb';

export const getMessages = (locale: string) => {
  if (locale === 'en') {
    return tekster_en;
  } else if (locale === 'nn') {
    return tekster_nn;
  } else {
    return tekster_nb;
  }
};

export const hentTittelMedNr = (
  liste: any[],
  oppholdsnr: number,
  tittel: string
) => {
  const tall = liste.length >= 2 ? oppholdsnr + 1 : '';

  return tittel + ' ' + tall;
};

export const hentListeMedSpråk = (): Språk[] => [
  { tittel: 'Bokmål', locale: 'nb' },
  { tittel: 'English', locale: 'en' },
];

export const hentValgtSpråk = (locale: string) => {
  let språk: string = '';
  locale === 'en'
    ? (språk = 'English')
    : locale === 'nn'
    ? (språk = 'Nynorsk')
    : (språk = 'Bokmål');
  return språk;
};
