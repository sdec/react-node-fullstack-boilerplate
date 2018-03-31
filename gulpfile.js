const colors = require('colors');
const gulp = require('gulp4');
const gutil = require('gulp-util');
const rimraf = require('rimraf');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const WebpackDevServer = require('webpack-dev-server');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfigClientHmr = require('./build/webpack.client.hmr.conf');
const webpackConfigClientSsr = require('./build/webpack.client.ssr.conf');
const webpackConfigServerHmr = require('./build/webpack.server.hmr.conf');
const webpackConfigServerSsr = require('./build/webpack.server.ssr.conf');
const webpackConfigI18n = require('./build/webpack.i18n.conf');

const buildConfig = require('./build/env');

/**
 * Util
 */
function runWebpack(buildConfig) {
  return new Promise((resolve, reject) => {
    webpack(buildConfig, (err, stats) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        gutil.log(
          '[webpack]',
          stats.toString({
            /* output options */
          })
        );
        resolve(stats);
      }
    });
  });
}

/**
 * Low level tasks
 */

// Clean client generated files
gulp.task('clean', (cb) => {
  rimraf(buildConfig.paths.dist, cb);
});

gulp.task('client:serve', () => {
  gutil.log(`Serving application using environment: ${process.env.NODE_ENV}`);

  const config = webpackConfigClientHmr(buildConfig);

  const options = buildConfig.webpackDevServer;
  options.publicPath = config.output.publicPath;

  WebpackDevServer.addDevServerEntrypoints(config, options);

  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, options);

  server.listen(buildConfig.webpackDevServer.port, buildConfig.webpackDevServer.host);

  browserSync.init({
    port: 3000,
    proxy: {
      target: `http://${buildConfig.webpackDevServer.host}:${buildConfig.webpackDevServer.port}`,
      ws: true
    },
    middleware: [webpackHotMiddleware(compiler, buildConfig.webpackHotServer)],
    files: ['./src/**/*.{html,css,scss,json}']
  });

  browserSync.watch('./dist/**/*.css', (event, file) => {
    console.log(event, ' event on ', file);
    if (event === 'change') {
      browserSync.reload('*.css');
    }
  });
});

gulp.task('server:serve', () => {
  const serveBuildConfig = { ...buildConfig, ...{ __LOCAL_SERVER__: true } };
  return runWebpack(webpackConfigServerHmr(serveBuildConfig));
});

gulp.task('client:build', () => {
  return runWebpack(webpackConfigClientSsr(buildConfig));
});

gulp.task('server:build', () => {
  return runWebpack(webpackConfigServerSsr(buildConfig));
});

gulp.task('i18n:build', () => {
  return runWebpack(webpackConfigI18n(buildConfig));
});

/**
 * Intermediate tasks
 */

/**
 * High level tasks
 */
gulp.task('client:serve', gulp.series('clean', 'client:serve'));
gulp.task('server:serve', gulp.series('clean', 'client:build', 'server:serve'));
gulp.task('build', gulp.series('clean', 'i18n:build', 'client:build', 'server:build'));
