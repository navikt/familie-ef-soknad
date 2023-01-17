import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ClientRequest, IncomingMessage } from 'http';
import * as querystring from 'querystring';
import { v4 as uuid } from 'uuid';
import logger from './logger';

const restream = (proxyReq: ClientRequest, req: IncomingMessage) => {
  const requestBody = (req as Request).body;
  if (requestBody) {
    const contentType = proxyReq.getHeader('Content-Type');

    let bodyData;

    if (contentType === 'application/json') {
      bodyData = JSON.stringify(requestBody);
    }

    if (contentType === 'application/x-www-form-urlencoded') {
      bodyData = querystring.stringify(requestBody);
    }

    if (bodyData) {
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
};

export const doProxy = (targetUrl: string, context: string): RequestHandler => {
  return createProxyMiddleware(context, {
    changeOrigin: true,
    logLevel: 'info',
    logProvider: () => {
      return logger;
    },
    onProxyReq: restream,
    pathRewrite: (path: string) => {
      return path.replace(context, '');
    },
    secure: true,
    target: `${targetUrl}`,
  });
};

export const addCallId = (): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.headers['nav-call-id'] = req.headers['x-correlation-id'] ?? uuid();
    next();
  };
};
