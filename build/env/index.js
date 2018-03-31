const _ = require('lodash');
const fs = require('fs');

// Read supported environments
const ignoredFiles = ['common.js', 'default.js', 'index.js'];
const supportedEnvironments = _.without(fs.readdirSync(__dirname, 'utf-8'), ...ignoredFiles).map((fileName) => fileName.replace('.js', ''));

let currentEnvironmentConfig = undefined;
if (!process.env.NODE_ENV || !_.includes(supportedEnvironments, process.env.NODE_ENV)) {
  currentEnvironmentConfig = require('./default');
} else {
  currentEnvironmentConfig = require(`./${process.env.NODE_ENV}`);
}

const config = _.merge({}, require('./common'), currentEnvironmentConfig, { env: process.env });
_.extend(process, config.process);

module.exports = config;
