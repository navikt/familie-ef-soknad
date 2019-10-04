import tekster from '../sprak/tekster';

export const getMessages = (locale: string) => {
  if (locale === 'en') {
    return tekster.en;
  } else if (locale === 'nb') {
    return tekster.nb;
  } else if (locale === 'nn') {
    return tekster.nn;
  } else {
    console.log('Locale not valid. Setting default nb');
    return tekster.nb;
  }
};
