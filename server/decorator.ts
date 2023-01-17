import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { Env } from '@navikt/nav-dekoratoren-moduler';
import logger from './logger';

const getHtmlWithDecorator = (filePath: string) => {
  const env = process.env.ENV as Env;
  if (env === undefined) {
    logger.error('Mangler miljø for dekoratøren');
    throw Error('Miljø kan ikke være undefined');
  }

  const dekoratørConfig = {
    env: env,
    simple: true,
    port: 8080,
    enforceLogin: true,
    redirectToApp: true,
    level: 'Level4',
    filePath: filePath,
  };
  if (env === 'localhost') {
    return injectDecoratorServerSide({
      ...dekoratørConfig,
      env: 'dev',
    });
  }

  return injectDecoratorServerSide(dekoratørConfig);
};

export default getHtmlWithDecorator;
