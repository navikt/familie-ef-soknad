const {injectDecoratorServerSide} = require("@navikt/nav-dekoratoren-moduler/ssr");

const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.ENV,
        simple: true,
        port: 8080,
        enforceLogin: true,
        redirectToApp: true,
        level: 'Level4',
        filePath: filePath})


module.exports = getHtmlWithDecorator;