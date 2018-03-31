const deepExtend = require('deep-extend');

const currentEnvironmentConfig = process.env.NODE_ENV ? require(`./${process.env.NODE_ENV}`) : require('./default');
const config = deepExtend({}, require('./common'), currentEnvironmentConfig, { env: process.env });

deepExtend(process, config.process);
module.exports = config;
