import logger from './logger';
import 'dotenv/config';

const brukDevApi = process.env.BRUK_DEV_API === 'true';
const erLokalt = process.env.ENV === 'localhost';
const lokaltMiljø = {
  dokumentUrl: brukDevApi
    ? 'https://familie-dokument.intern.dev.nav.no/familie/dokument'
    : 'http://localhost:8082',
  apiUrl: brukDevApi
    ? 'https://familie-ef-soknad-api.intern.dev.nav.no/familie/alene-med-barn/soknad-api'
    : 'http://localhost:8091',
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

export const miljø = {
  ...initierMiljøvariabler(),
  lokaltTokenxApi: process.env.TOKENX_API,
  lokaltTokenxDokument: process.env.TOKENX_DOKUMENT,
  brukDevApi: brukDevApi,
  erLokalt: erLokalt,
};
