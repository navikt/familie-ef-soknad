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
  tekststreng: string,
  en?: string,
  to?: string
) => {
  let tekst = tekststreng;

  if (en) tekst = tekst.replace('[0]', en);
  if (to) tekst = tekst.replace('[1]', to);

  return tekst;
};

export const hentBeskjedMedFireParametre = (
  tekststreng: string,
  en?: string,
  to?: string,
  tre?: string,
  fire?: string
) => {
  let tekst = tekststreng;

  if (en) tekst = tekst.replace(/\[0\]/g, en);
  if (to) tekst = tekst.replace(/\[1\]/g, to);
  if (tre) tekst = tekst.replace(/\[2\]/g, tre);
  if (fire) tekst = tekst.replace(/\[3\]/g, fire);

  return tekst;
};
