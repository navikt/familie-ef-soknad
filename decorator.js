const { injectDecoratorServerSide } = require("@navikt/nav-dekoratoren-moduler/ssr");

const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.ENV,
        simple: true,
        enforceLogin: true,
        redirectToApp: true,
        level: 4,
        filePath: filePath});


module.exports = getHtmlWithDecorator;