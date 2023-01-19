import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { Env } from '@navikt/nav-dekoratoren-moduler';
import logger from './logger';

type NaisEnv = 'prod' | 'dev';

const getHtmlWithDecorator = (filePath: string) => {
  const env = process.env.ENV as Env;
  if (env === undefined) {
    logger.error('Mangler miljø for dekoratøren');
    throw Error('Miljø kan ikke være undefined');
  }

  const dekoratørConfig = {
    env: env === 'localhost' ? 'dev' : (env as NaisEnv),
    simple: true,
    enforceLogin: true,
    redirectToApp: true,
    level: 'Level4',
    filePath: filePath,
  };

  return injectDecoratorServerSide(dekoratørConfig);
};

export default getHtmlWithDecorator;
