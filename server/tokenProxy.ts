import { NextFunction, Request, RequestHandler, Response } from 'express';
import TokenXClient from './tokenx';
import logger from './logger';

const { exchangeToken } = new TokenXClient();

export type ApplicationName = 'familie-ef-soknad-api' | 'familie-dokument';

const attachToken = (applicationName: ApplicationName): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticationHeader = await prepareSecuredRequest(
        req,
        applicationName
      );
      req.headers.Authorization = authenticationHeader.authorization;
      return next();
    } catch (error) {
      logger.error(
        `Noe gikk galt ved setting av token (${req.method} - ${req.path}): `,
        error
      );
      return res.status(500).send('Error');
    }
  };
};
const prepareSecuredRequest = async (
  req: Request,
  applicationName: ApplicationName
) => {
  logger.info('PrepareSecuredRequest');
  const { authorization } = req.headers;
  const token = authorization!!.split(' ')[1];
  logger.info('IdPorten-token found: ' + (token.length > 1));
  const accessToken = await exchangeToken(token, applicationName).then(
    (accessToken) => accessToken
  );
  return {
    authorization: `Bearer ${accessToken}`,
  };
};

export default attachToken;
