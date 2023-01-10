import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { Env } from '@navikt/nav-dekoratoren-moduler';
import logger from './logger';

const getHtmlWithDecorator = (filePath: string) => {
  const env = process.env.ENV as Env;
  if (env === undefined) {
    logger.error('Mangler miljø for dekoratøren');
    throw Error('Miljø kan ikke være undefined');
  }
  return injectDecoratorServerSide({
    env: env,
    simple: true,
    port: 8080,
    enforceLogin: true,
    redirectToApp: true,
    level: 'Level4',
    filePath: filePath,
  });
};

export default getHtmlWithDecorator;
