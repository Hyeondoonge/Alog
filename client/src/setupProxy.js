const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:4500',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
  app.use(
    '/baekjoon',
    proxy({
      target: 'https://www.acmicpc.net',
      changeOrigin: true,
      pathRewrite: {
        '^/baekjoon': ''
      }
    })
  );
};
