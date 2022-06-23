const express = require('express');
const path = require('path');
const getHtmlWithDecorator = require("./decorator");
const buildPath = path.resolve(__dirname, "../build");
const logger = require("./logger");

const EF_BASE_PATH = '/familie/alene-med-barn';
const BASE_PATH = `${EF_BASE_PATH}/soknad`;
const ETTERSENDING_PATH = `${EF_BASE_PATH}/ettersending`;

const routes = () => {
    const expressRouter = express.Router();

    expressRouter.get(`${BASE_PATH}/internal/isAlive|isReady`, (req, res) =>
        res.sendStatus(200)
    );

    expressRouter.get(`${BASE_PATH}/innsendtsoknad/*`, (req, res, next) => {
        res.redirect(ETTERSENDING_PATH)
    });

    expressRouter.use(BASE_PATH, express.static(buildPath, {index: false}));

    expressRouter.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => {
        getHtmlWithDecorator((path.join(buildPath, 'index.html')))
            .then((html) => {
                res.send(html);
            })
            .catch((e) => {
                logger.error(e)
                res.status(500).send(e);
            })
    })

    return expressRouter
}


module.exports = routes;