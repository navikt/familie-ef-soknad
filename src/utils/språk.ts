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

export const hentBeskjedMedNavn = (navn: string, tekststreng: string) => {
  const tekst = tekststreng.replace('[0]', navn);
  return tekst;
};

export const hentBeskjedMedToParametre = (
  en: string,
  to: string,
  tekststreng: string
) => {
  let tekst = tekststreng.replace('[0]', en).replace('[1]', to);
  return tekst;
};
