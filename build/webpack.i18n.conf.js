/**
 * Webpack configuration file for:
 * - i18n files
 */

const webpack = require('webpack');
const path = require('path');

const HardSourcePlugin = require('hard-source-webpack-plugin');
const PhraseAppBuilderPlugin = require('webpack-phraseapp-builder');

module.exports = (buildConfig) => {
  const includePath = [path.resolve(buildConfig.paths.client.src)];

  return {
    entry: {
      client: './src/client/core/i18n/index.js'
    },

    resolve: {
      extensions: ['.js'],
      modules: includePath.concat('node_modules')
    },

    output: {
      publicPath: '/',
      path: path.resolve(buildConfig.paths.dist)
    },

    plugins: [
      new HardSourcePlugin(),
      new PhraseAppBuilderPlugin({
        accessToken: buildConfig.phraseApp.accessToken,
        projectId: buildConfig.phraseApp.projectId,
        outputPath: buildConfig.paths.client.i18n,
        format: 'json'
      })
    ]
  };
};
