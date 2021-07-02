const { injectDecoratorServerSide } = require("@navikt/nav-dekoratoren-moduler/ssr");

const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.ENV,
        simple: true,
        enforceLogin: true,
        redirectToApp: true,
        filePath: filePath});


module.exports = getHtmlWithDecorator;