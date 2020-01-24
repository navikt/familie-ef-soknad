const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    proxy('/api', {
      changeOrigin: true,
      logLevel: 'info',
      target: `${
        process.env.ENV === 'local'
          ? 'http://localhost:8091'
          : 'http://familie-ef-soknad-api'
      }`,
      secure: true,
    })
  );
};
