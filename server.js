const express = require('express');
const path = require('path');
const { injectDecoratorServerSide } = require("@navikt/nav-dekoratoren-moduler/ssr");
const buildPath = path.resolve(__dirname, "../build");
const basePath = "/person/personopplysninger";

const app = express();

const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
      env: process.env.ENV,
      filePath: filePath});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
