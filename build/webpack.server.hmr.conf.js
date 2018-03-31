/**
 * Webpack configuration file for:
 * - The client
 * - When in development mode (HMR enabled, no SSR)
 */

const webpack = require('webpack');
const path = require('path');

const HardSourcePlugin = require('hard-source-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (buildConfig) => {
  const includePath = [path.resolve(buildConfig.paths.server.src)];

  return {
    watch: buildConfig.__LOCAL_SERVER__,
    target: 'node',
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
      })
    ],
    entry: [].concat(buildConfig.__LOCAL_SERVER__ ? ['webpack/hot/poll?1000'] : []).concat(['./src/server/index']),
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',

    resolve: {
      extensions: ['.js', '.json'],
      modules: includePath.concat('node_modules')
    },

    output: {
      publicPath: '/',
      path: path.resolve(buildConfig.paths.dist),
      filename: 'index.js',
      chunkFilename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        /**
         * Preloaders
         */

        // Source maps
        {
          exclude: /node_modules/,
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre'
        },

        /**
         * Loaders
         */

        // Babel
        {
          exclude: /node_modules/,
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: ['@babel/plugin-proposal-object-rest-spread'],
                presets: ['@babel/preset-env', '@babel/preset-stage-0', '@babel/preset-react'],
                ignore: ['node_modules', 'dist']
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                fix: true,
                cache: true,
                emitError: process.env.NODE_ENV === 'production',
                failOnWarning: process.env.NODE_ENV === 'production',
                failOnError: process.env.NODE_ENV === 'production'
              }
            }
          ]
        },

        // CSS
        {
          exclude: /node_modules/,
          test: /\.css$/,
          use: ['style-loader', 'css-loader/']
        },

        // URL
        {
          exclude: /node_modules/,
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        },

        // JSON
        {
          exclude: /node_modules/,
          test: /\.json$/,
          use: 'json-loader'
        }
      ]
    },

    plugins: [
      new HardSourcePlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new NpmInstallPlugin(),
      new CopyWebpackPlugin([
        {
          from: `${buildConfig.paths.server.src}/config/env`,
          to: './config/env'
        },
        {
          from: `${buildConfig.paths.server.src}/assets`,
          to: './assets'
        }
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          LOCAL_SERVER: JSON.stringify(buildConfig.__LOCAL_SERVER__)
        },
        'process.env.BUILD_CONFIG': JSON.stringify(buildConfig)
      })
    ]
      .concat(process.env.NODE_ENV !== 'production' ? [new webpack.HotModuleReplacementPlugin(buildConfig.webpackHotServer)] : [])
      .concat(
        process.env.NODE_ENV === 'production' ? [new webpack.optimize.ModuleConcatenationPlugin(), new webpack.HashedModuleIdsPlugin()] : []
      )
      .concat(
        buildConfig.__LOCAL_SERVER__
          ? [
              new StartServerPlugin({
                name: 'index.js',
                nodeArgs: ['--inspect']
              })
            ]
          : []
      ),

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      Buffer: false,
      __dirname: false,
      __filename: false,
      clearImmediate: false,
      clearInterval: false,
      clearTimeout: false,
      console: false,
      exports: false,
      global: false,
      module: false,
      process: false,
      require: false,
      setImmediate: false,
      setInterval: false,
      setTimeout: false
    }
  };
};
