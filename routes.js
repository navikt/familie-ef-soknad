const express  = require('express');
const path = require('path');
const getHtmlWithDecorator = require("./decorator");
const buildPath = path.resolve(__dirname, "build");

const routes = () => {
    const expressRouter = express.Router();

    expressRouter.get('/internal/isAlive', (_req, res) => {
        res.sendStatus(200)
    })

    expressRouter.get('/internal/isReady', (_req, res) => {
        res.sendStatus(200)
    })

    expressRouter.use(express.static(buildPath, {index: false}))
    expressRouter.get('*', (req, res) => {
        getHtmlWithDecorator((path.join(__dirname, 'build', 'index.html')))
            .then((html) => {
                res.send(html);
            })
            .catch((e) => {
                res.status(500).send(e);
            })})
    return expressRouter
}


module.exports = routes;