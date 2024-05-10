import {
  DecoratorLocale,
  injectDecoratorServerSide,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import logger from './logger';
import { miljø } from './miljø';

type NaisEnv = 'prod' | 'dev';

const getHtmlWithDecorator = (filePath: string) => {
  const env = process.env.ENV;
  if (env === undefined) {
    logger.error('Mangler miljø for dekoratøren');
    throw Error('Miljø kan ikke være undefined');
  }

  const dekoratørConfig = {
    env: miljø.erLokalt ? 'dev' : (env as NaisEnv),
    filePath: filePath,
    params: {
      simple: true,
      enforceLogin: false,
      redirectToApp: true,
      level: 'Level4',
      availableLanguages: [
        { url: '/', locale: 'nb' as DecoratorLocale, handleInApp: true },
        { url: '/', locale: 'en' as DecoratorLocale, handleInApp: true },
      ],
    },
  };

  return injectDecoratorServerSide(dekoratørConfig);
};

export default getHtmlWithDecorator;
