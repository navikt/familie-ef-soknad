import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
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
    },
  };

  return injectDecoratorServerSide(dekoratørConfig);
};

export default getHtmlWithDecorator;
