const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:4500',
      changeOrigin: true
    })
  );
  app.use(
    '/problem',
    proxy({
      target: 'https://www.acmicpc.net',
      changeOrigin: true
    })
  );
};
