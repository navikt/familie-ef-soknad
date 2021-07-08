const {injectDecoratorServerSide} = require("@navikt/nav-dekoratoren-moduler/ssr");
const logger = require("./logger");

const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.ENV,
        simple: true,
        port: 8080,
        enforceLogin: true,
        redirectToApp: true,
        level: 'Level4',
        filePath: filePath}).catch((e) => logger.error(`Feil er hvor ${e}`))


module.exports = getHtmlWithDecorator;