import logger from './logger';

const lokaltMiljø = {
  dokumentUrl: 'http://localhost:8082',
  apiUrl: 'http://localhost:8091',
  oauthCallbackUri:
    'https://localhost:8080/familie/alene-med-barn/soknad/oauth2/callback',
};

const devMiljø = {
  dokumentUrl: 'http://familie-dokument/familie/dokument',
  apiUrl: 'http://familie-ef-soknad-api/familie/alene-med-barn/soknad-api',
  oauthCallbackUri:
    'https://familie.ekstern.dev.nav.no/familie/alene-med-barn/soknad/oauth2/callback',
};

const prodMiljø = {
  dokumentUrl: 'http://familie-dokument/familie/dokument',
  apiUrl: 'http://familie-ef-soknad-api/familie/alene-med-barn/soknad-api',
  oauthCallbackUri:
    'https://www.nav.no/familie/alene-med-barn/soknad/oauth2/callback',
};

const initierMiljøvariabler = () => {
  switch (process.env.ENV) {
    case 'localhost':
      return lokaltMiljø;
    case 'dev':
      return devMiljø;
    case 'prod':
      return prodMiljø;
    default:
      logger.warn('Mangler miljøvariabler - setter lokale variabler');
      return lokaltMiljø;
  }
};

export const miljø = initierMiljøvariabler();
