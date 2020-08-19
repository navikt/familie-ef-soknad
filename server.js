var dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const proxy = require('http-proxy-middleware');

app.use(express.static(path.join(__dirname, 'build')));

app.use('/', function(req, res, next) {
  console.log(`Server: A new request received at ${process.env.NODE_ENV}`);
  next();
});

// proxy
app.use(
  '/api',
  proxy('/api', {
    changeOrigin: true,
    logLevel: 'info',
    target: `${
      process.env.NODE_ENV === 'local'
        ? 'http://localhost:8091'
        : //: 'http://familie-ef-soknad-api'
          'http://familie-ef-soknad-api.dev-sbs.nais.io'
    }`,
    secure: true,
  })
);

app.get('/ping', (req, res) => {
  res.send({ express: ' Ack :) ' });
});
// Nais functions
app.get(`/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.get('*', function(req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'build/', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

console.log('Node env: ', process.env.NODE_ENV);

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
