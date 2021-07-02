const express  = require('express');
const path = require('path');
const getHtmlWithDecorator = require("./decorator");
const logger = require("./logger");
const buildPath = path.resolve(__dirname, "build");
const BASE_PATH = '/familie/alene-med-barn/soknad';

const routes = () => {
    const expressRouter = express.Router();

    expressRouter.get('/internal/isAlive', (_req, res) => {
        res.sendStatus(200)
    })

    expressRouter.get('/internal/isReady', (_req, res) => {
        res.sendStatus(200)
    })

    expressRouter.use(BASE_PATH, express.static(buildPath, {index: false}))
    expressRouter.get('*', (req, res) => {
        getHtmlWithDecorator((path.join(__dirname, 'build', 'index.html')))
            .then((html) => {
                res.send(html);
            })
            .catch((e) => {
                logger.error(`ENV er satt til ${process.env.ENV}`);
                logger.error(e)
                res.status(500).send(e);
            })})
    return expressRouter
}


module.exports = routes;