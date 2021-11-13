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
  app.use(
    '/goorm',
    proxy({
      target: 'https://level.goorm.io/',
      changeOrigin: true,
      pathRewrite: {
        '^/goorm': ''
      }
    })
  );
  app.use(
    '/kakao',
    proxy({
      target: 'https://kapi.kakao.com',
      changeOrigin: true,
      pathRewrite: {
        '^/kakao': ''
      }
    })
  );
};
