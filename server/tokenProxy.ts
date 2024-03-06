import { NextFunction, Request, RequestHandler, Response } from 'express';
import TokenXClient from './tokenx';
import { logWarn, logInfo } from './logger';
import { miljø } from './miljø';
import axios from 'axios';

const { exchangeToken } = new TokenXClient();

export type ApplicationName = 'familie-ef-soknad-api' | 'familie-dokument';

const AUTHORIZATION_HEADER = 'authorization';
const WONDERWALL_ID_TOKEN_HEADER = 'x-wonderwall-id-token';

const attachToken = (applicationName: ApplicationName): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.headers[AUTHORIZATION_HEADER] =
        miljø.erLokalt && !miljø.brukDevApi
          ? await getFakedingsToken(applicationName)
          : await getAccessToken(req, applicationName);
      req.headers[WONDERWALL_ID_TOKEN_HEADER] = '';
      next();
    } catch (error) {
      logWarn(
        `Noe gikk galt ved setting av token (${req.method} - ${req.path}): `,
        req,
        error
      );
      return res
        .status(401)
        .send('En uventet feil oppstod. Ingen gyldig token');
    }
  };
};

const harBearerToken = (authorization: string) => {
  return authorization.includes('Bearer ');
};

const utledToken = (req: Request, authorization: string | undefined) => {
  if (authorization && harBearerToken(authorization)) {
    return authorization.split(' ')[1];
  } else {
    throw Error('Mangler authorization i header');
  }
};

const getAccessToken = async (
  req: Request,
  applicationName: ApplicationName
): Promise<string> => {
  logInfo('PrepareSecuredRequest', req);
  if (miljø.erLokalt) {
    const lokalToken =
      applicationName === 'familie-ef-soknad-api'
        ? miljø.lokaltTokenxApi
        : miljø.lokaltTokenxDokument;
    return `Bearer ${lokalToken}`;
  }
  const { authorization } = req.headers;
  const token = utledToken(req, authorization);
  logInfo('IdPorten-token found: ' + (token.length > 1), req);
  const accessToken = await exchangeToken(token, applicationName).then(
    (accessToken) => accessToken
  );
  return `Bearer ${accessToken}`;
};

const getFakedingsToken = async (applicationName: string): Promise<string> => {
  const clientId = 'dev-gcp:teamfamilie:familie-ef-soknad';
  const audience = `dev-gcp:teamfamilie:${applicationName}`;
  const url = `https://fakedings.intern.dev.nav.no/fake/tokenx?client_id=${clientId}&aud=${audience}&acr=Level4&pid=31458931375`;
  const token = await axios.get(url);

  return 'Bearer ' + token.data;
};

export default attachToken;
