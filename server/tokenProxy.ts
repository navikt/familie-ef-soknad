import { NextFunction, Request, RequestHandler, Response } from 'express';
import TokenXClient from './tokenx';
import logger from './logger';

const { exchangeToken } = new TokenXClient();

export type ApplicationName = 'familie-ef-soknad-api' | 'familie-dokument';

const AUTHORIZATION_HEADER = 'authorization';
const WONDERWALL_ID_TOKEN_HEADER = 'x-wonderwall-id-token';

const attachToken = (applicationName: ApplicationName): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticationHeader = await prepareSecuredRequest(
        req,
        applicationName
      );
      req.headers[AUTHORIZATION_HEADER] = authenticationHeader.authorization;
      req.headers[WONDERWALL_ID_TOKEN_HEADER] = '';
      next();
    } catch (error) {
      logger.error(
        `Noe gikk galt ved setting av token (${req.method} - ${req.path}): `,
        error
      );
      return res.status(500).send('En uventet feil oppstod.');
    }
  };
};

const erLokalt = () => {
  return process.env.ENV === 'localhost';
};

const utledToken = (req: Request, authorization: string | undefined) => {
  return erLokalt()
    ? req.cookies['localhost-idtoken']
    : authorization!!.split(' ')[1];
};

const prepareSecuredRequest = async (
  req: Request,
  applicationName: ApplicationName
) => {
  logger.info('PrepareSecuredRequest');
  const { authorization } = req.headers;
  const token = utledToken(req, authorization);
  logger.info('IdPorten-token found: ' + (token.length > 1));
  const accessToken = await exchangeToken(token, applicationName).then(
    (accessToken) => accessToken
  );
  return {
    authorization: `Bearer ${accessToken}`,
  };
};

export default attachToken;
