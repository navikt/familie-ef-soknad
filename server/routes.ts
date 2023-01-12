import express from 'express';
import path from 'path';
import getHtmlWithDecorator from './decorator';
import logger from './logger';
import { addCallId, doProxy } from './proxy';
import attachToken from './tokenProxy';
import { miljø } from './miljø';

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
    addCallId(),
    attachToken('familie-ef-soknad-api'),
    doProxy(miljø.apiUrl, `${BASE_PATH}/api`)
  );

  expressRouter.use(
    `${BASE_PATH}/dokument`,
    addCallId(),
    attachToken('familie-dokument'),
    doProxy(miljø.dokumentUrl, `${BASE_PATH}/dokument`)
  );

  return expressRouter;
};

export default routes;
