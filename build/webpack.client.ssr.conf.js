const path = require('path');

module.exports = (buildConfig) => ({
  ...require('./webpack.client.hmr.conf')(buildConfig),
  ...{
    output: {
      publicPath: '/',
      path: path.join(path.resolve(buildConfig.paths.dist), 'static')
    }
  }
});
