const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5050',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
  app.use(
    '/solvedac',
    createProxyMiddleware({
      target: 'https://solved.ac/',
      changeOrigin: true,
      pathRewrite: {
        '^/solvedac': ''
      }
    })
  );
  app.use(
    '/goorm',
    createProxyMiddleware({
      target: 'https://level.goorm.io/',
      changeOrigin: true,
      pathRewrite: {
        '^/goorm': ''
      }
    })
  );
};
