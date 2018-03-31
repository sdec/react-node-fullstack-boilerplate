// Polyfills
require('babel-polyfill');

// Dependencies
const colors = require('colors');

colors.setTheme({
  info: 'green',
  debug: 'blue',
  warn: 'yellow',
  error: 'red',
  help: 'cyan',
  data: 'grey',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey'
});

// eslint-disable-next-line no-undef
const envConfig = __non_webpack_require__('./config/env');

const http = require('http');
const app = require('./app').createApp(envConfig);

process.on('uncaughtException', (err) => {
  console.log(err);
});

const startServer = (server) => {
  server.listen(app.get('port'), () => {
    console.log('Express server started on '.info + `port ${app.get('port')}`.debug + ' in'.info + ` ${process.env.NODE_ENV} mode`.debug);
  });
};

// Listen for requests
let server = http.createServer(app);
startServer(server);

if (module.hot) {
  module.hot.accept('./app', () => {
    server.close(() => {
      // eslint-disable-next-line global-require
      const newApp = require('./app').createApp(envConfig);

      server.close(() => {
        server = http.createServer(newApp);
        startServer(server);
      });
    });
  });
}
