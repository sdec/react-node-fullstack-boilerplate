/**
 * Webpack configuration file for:
 * - The client
 * - When in development mode (HMR enabled, no SSR)
 */

const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HardSourcePlugin = require('hard-source-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const InfoPlugin = require('webpack-info-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (buildConfig) => {
  const includePath = [path.resolve(buildConfig.paths.client.src)];

  return {
    entry: {
      client: ['babel-polyfill/dist/polyfill.js']
        .concat(process.env.NODE_ENV !== 'production' ? ['react-hot-loader/patch'] : [])
        .concat(['./src/client/index.js']),
      vendor: [
        'react',
        'react-dom',
        'react-helmet',
        'react-redux',
        'react-router',
        'react-router-dom',
        'react-router-redux',
        'redux',
        'redux-actions',
        'redux-logger',
        'redux-thunk',
        'react-popper'
      ]
    },
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',

    resolve: {
      extensions: ['.js', '.json'],
      modules: includePath.concat('node_modules')
    },

    output: {
      publicPath: '/',
      path: path.resolve(buildConfig.paths.dist),
      filename: process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js',
      chunkFilename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].bundle.js' : '[name].bundle.js'
    },
    module: {
      rules: [
        /**
         * Preloaders
         */

        // Source maps
        {
          test: /\.js$/,
          include: includePath,
          use: ['source-map-loader'],
          enforce: 'pre'
        },

        /**
         * Loaders
         */

        // Babel
        {
          include: includePath,
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  [
                    'direct-import',
                    {
                      modules: ['history', 'redux', 'react-redux', 'material-ui', 'react-router', 'react-router-dom', 'redux-actions']
                    }
                  ],
                  '@babel/plugin-proposal-object-rest-spread',
                  'babel-plugin-transform-imports',
                  'react-hot-loader/babel'
                ],
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      modules: false,
                      targets: {
                        browsers: ['last 2 version']
                      }
                    }
                  ],
                  '@babel/preset-stage-0',
                  '@babel/preset-react'
                ],
                ignore: ['node_modules', 'dist', 'src/server']
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
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },

        // URL
        {
          include: includePath,
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
          include: includePath,
          test: /\.json$/,
          use: 'json-loader'
        }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: 3
      }),
      new HtmlWebpackPlugin({
        inject: 'head',
        hash: false,
        cache: false,
        showErrors: true,
        template: './build/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        },
        'process.env.BUILD_CONFIG': JSON.stringify(buildConfig)
      }),
      new ManifestPlugin({
        fileName: 'manifest.json',
        basePath: path.join(__dirname, 'dist', '/')
      }),
      new HardSourcePlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new CopyWebpackPlugin([
        {
          from: buildConfig.paths.public.src,
          to: '.'
        }
      ]),
      new NpmInstallPlugin(),
      new InfoPlugin()
    ]
      .concat(process.env.NODE_ENV !== 'production' ? [new webpack.HotModuleReplacementPlugin(buildConfig.webpackHotServer)] : [])
      .concat(
        process.env.NODE_ENV === 'production'
          ? [
              new webpack.optimize.ModuleConcatenationPlugin(),
              new webpack.HashedModuleIdsPlugin(),
              new UglifyJSPlugin(),
              new CompressionPlugin({
                test: /\.js$/,
                cache: true,
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                threshold: 0,
                minRatio: 0.8,
                deleteOriginalAssets: false
              })
            ]
          : []
      )
  };
};
