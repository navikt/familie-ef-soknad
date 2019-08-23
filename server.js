require('dotenv').config();

const fs = require('fs');
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./src/build/scripts/decorator');
const createEnvSettingsFile = require('./src/build/scripts/envSettings');

const serveGzipped = (contentType) => (req, res, next) => {
  const acceptedEncodings = req.acceptsEncodings();
  const gZippedFile = `${__dirname}${req.url}.gz`;

  if (acceptedEncodings.includes('gzip') && fs.existsSync(gZippedFile)) {
    req.url = `${req.url}.gz`;
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', contentType);
  }

  next();
};

const renderApp = (decoratorFragments) =>
  new Promise((resolve, reject) => {
    server.render('index.html', decoratorFragments, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });

const startServer = (html) => {
  server.use('/dist/js', express.static(path.resolve(__dirname, 'dist/js')));
  server.use('/dist/css', express.static(path.resolve(__dirname, 'dist/css')));
  server.use('/dist/assets', express.static(path.join(__dirname, 'dist/assets')));
  server.use('/sitemap.xml', express.static(path.join(__dirname, 'dist/sitemap.xml')));

  server.get(['/dist/js/settings.js'], (req, res) => {
    res.sendFile(path.resolve(`../../dist/js/settings.js`));
  });

  server.get('/health/isAlive', (req, res) => res.sendStatus(200));
  server.get('/health/isReady', (req, res) => res.sendStatus(200));

  server.get(/^\/(?!.*dist).*$/, (req, res) => {
    res.send(html);
  });

  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

// Konfigurer server
const server = express();

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

server.get('*.js', serveGzipped('text/javascript'));
server.get('*.css', serveGzipped('text/css'));

createEnvSettingsFile(path.resolve(`${__dirname}/dist/js/settings.js`));

// Start server
getDecorator()
  .then(renderApp, (error) => {
    logError('Failed to get decorator', error);
    process.exit(1);
  })
  .then(startServer, (error) => logError('Failed to render app', error));
