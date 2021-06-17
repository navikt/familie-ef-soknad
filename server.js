const express = require('express');
const routes = require('./routes');

const BASE_PATH = '/familie/alene-med-barn/soknad';
const app = express();

app.use(BASE_PATH, routes());

app.listen(8080);
