import proxy from './tokenProxy';

import express from 'express';

import path from 'path';

import getHtmlWithDecorator from './decorator';

import logger from './logger';

const buildPath = path.resolve(process.cwd(), '../build');
const EF_BASE_PATH = '/familie/alene-med-barn';
const BASE_PATH = `${EF_BASE_PATH}/soknad`;
const ETTERSENDING_PATH = `${EF_BASE_PATH}/ettersending`;

const routes = () => {
  const expressRouter = express.Router();

  expressRouter.get(`${BASE_PATH}/internal/isAlive|isReady`, (req, res) =>
    res.sendStatus(200)
  );

  expressRouter.get(`${BASE_PATH}/innsendtsoknad*`, (req, res, next) => {
    res.redirect(ETTERSENDING_PATH);
  });

  expressRouter.use(BASE_PATH, express.static(buildPath, { index: false }));

  expressRouter.use(/^(?!.*\/(internal|static|api)\/).*$/, (req, res) => {
    getHtmlWithDecorator(path.join(buildPath, 'index.html'))
      .then((html) => {
        res.send(html);
      })
      .catch((e) => {
        logger.error(e);
        res.status(500).send(e);
      });
  });

  expressRouter.use(
    `${BASE_PATH}/api`,
    proxy('https://familie.dev.nav.no/familie/alene-med-barn/soknad-api')
  );

  expressRouter.use(
      `${BASE_PATH}/dokument`,
      proxy('https://familie.dev.nav.no/familie/dokument')
  );

  return expressRouter;
};

export default routes;
