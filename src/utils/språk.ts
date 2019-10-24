import tekster from '../language/tekster';
import { Språk } from '../models/språk';

export const getMessages = (locale: string) => {
  if (locale === 'en') {
    return tekster.en;
  } else if (locale === 'nn') {
    return tekster.nn;
  } else {
    return tekster.nb;
  }
};

export const hentListeMedSpråk = (): Språk[] => [
  { tittel: 'Bokmål', locale: 'nb' },
  { tittel: 'Nynorsk', locale: 'nn' },
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
