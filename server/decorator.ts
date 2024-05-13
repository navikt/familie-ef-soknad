import {
  DecoratorLocale,
  injectDecoratorServerSide,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import logger from './logger';
import { miljø } from './miljø';

type NaisEnv = 'prod' | 'dev';

type DecoratorLanguageOption =
  | {
      url?: string;
      locale: DecoratorLocale;
      handleInApp: true;
    }
  | {
      url: string;
      locale: DecoratorLocale;
      handleInApp?: false;
    };

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
        {
          locale: 'nb' as DecoratorLocale,
          handleInApp: true,
        } as DecoratorLanguageOption,
        {
          locale: 'en' as DecoratorLocale,
          handleInApp: true,
        } as DecoratorLanguageOption,
      ],
    },
  };

  return injectDecoratorServerSide(dekoratørConfig);
};

export default getHtmlWithDecorator;
