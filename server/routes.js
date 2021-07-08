const express = require('express');
const path = require('path');
const getHtmlWithDecorator = require("./decorator");
const buildPath = path.resolve(__dirname, "../build");
const logger = require("./logger");

const BASE_PATH = '/familie/alene-med-barn/soknad';

const routes = () => {
    const expressRouter = express.Router();

    expressRouter.get(`${BASE_PATH}/internal/isAlive|isReady`, (req, res) =>
        res.sendStatus(200)
    );
    expressRouter.use(BASE_PATH, express.static(buildPath, {index: false}));

    expressRouter.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => {
        logger.error(`Request path blev ${req.path}`)
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