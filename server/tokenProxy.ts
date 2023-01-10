import { Request, RequestHandler, Response } from 'express';
import lodash from 'lodash';
import TokenXClient from './tokenx';
import fetch from 'node-fetch';
import logger from './logger';

const isOK = (status: any) => [200, 404, 409].includes(status);
const { exchangeToken } = new TokenXClient();

export type ApplicationName = 'familie-ef-soknad-api' | 'familie-dokument';

const proxy = (
  url: string,
  applicationName: ApplicationName
): RequestHandler => {
  return async (req: Request, res: Response) => {
    try {
      const request = await prepareSecuredRequest(req, applicationName);
      const response = await fetch(`${url}${req.path}`, request);
      if (isOK(response.status)) {
        logger.info(
          `${response.status} ${response.statusText}: ${req.method} ${req.path}`
        );
      } else {
        logger.error(
          `${response.status} ${response.statusText}: ${req.method} ${req.path}`
        );
      }
      return res.status(response.status).send(await response.text());
    } catch (error) {
      logger.error(`Feilet kall (${req.method} - ${req.path}): `, error);
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
  const headers: any = {
    ...req.headers,
    authorization: `Bearer ${accessToken}`,
    // x_correlation_id: logger.defaultMeta.x_correlation_id,
  };
  let body = undefined;
  if (!lodash.isEmpty(req.body) && req.method === 'POST') {
    const imageTag = process.env.NAIS_APP_IMAGE?.replace(/^.*:(.*)/, '$1');
    if (req.path === '/api/soeknad') {
      const soeknader: any[] = req.body.soeknader.map((soeknad: any) => ({
        ...soeknad,
        imageTag,
      }));
      body = JSON.stringify({ soeknader });
    } else {
      body = JSON.stringify(req.body);
    }
  }
  return {
    method: req.method,
    body,
    headers,
  };
};

export default proxy;
