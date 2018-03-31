import path from 'path';
import express from 'express';
// Middleware
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import errorHandler from 'errorhandler';
import helmet from 'helmet';
import fingerprint from 'express-fingerprint';

import { ERRORS, sendMessages, STATUS_CODES } from './modules/response-handler';
import { renderClient } from './client';

import dbConfig from './config/db';
import passportConfig from './config/passport';

import apiRouter from './rest/api';
import authRouter from './rest/auth';
import qs from 'qs';

export const createApp = (envConfig) => {
  // Create express app
  const app = express();

  // Apply app settings
  app.set('port', envConfig.express.port);
  app.set('showStackError', envConfig.express.showStackError);
  app.enable('strict routing');
  app.enable('case sensitive routing');

  app.locals.pretty = true;
  app.locals.cache = true;

  // Configure database
  dbConfig(envConfig, app);

  // Configure passport
  passportConfig(envConfig, app);

  // Apply middleware
  app.use(helmet(envConfig.express.middleware.helmet));
  app.use(bodyParser.urlencoded(envConfig.express.middleware.bodyParser.urlencoded));
  app.use(bodyParser.json(envConfig.express.middleware.bodyParser.json));
  app.use(validator(envConfig.express.middleware.validator));
  app.use(compression(envConfig.express.middleware.compression));
  app.use(fingerprint(envConfig.express.middleware.fingerprint));
  app.use(morgan(envConfig.express.middleware.morgan));

  switch (process.env.NODE_ENV) {
    case 'development':
      app.use(cors());
      app.use(errorHandler());
      break;

    case 'production':
      break;

    default:
      break;
  }

  app.use(envConfig.api.resourcePath, apiRouter(envConfig, app));
  app.use(envConfig.auth.resourcePath, authRouter(envConfig, app));

  // Handle index.html
  if (process.env.NODE_ENV !== 'development') {
    // Create client dependencies
    const AppRoute = require('../client/core/modules/app').AppRoute;
    const theme = require('../client/app/theming').theme;
    const createAppStore = require('../client/app/store').createAppStore;

    app.get('/', (req, res) => {
      // Create store
      const params = qs.parse(req.query);
      const preloadedState = { ...params };
      const { store, persistor } = createAppStore(undefined, preloadedState);

      renderClient({ theme, store, persistor, AppRoute, req, res });
    });

    // Handle static assets
    app.get('*', express.static(path.resolve(path.join(process.cwd(), 'dist', 'static')), envConfig.express.static));

    // Handle index.html
    app.get('*', (req, res) => {
      // Create store
      const params = qs.parse(req.query);
      const preloadedState = { ...params };
      const { store, persistor } = createAppStore(undefined, preloadedState);

      renderClient({ theme, store, persistor, AppRoute, req, res });
    });
  }

  // Generic error handler
  app.use((req, res) => {
    sendMessages(req, res, STATUS_CODES.NOT_FOUND, ERRORS.GENERAL_ERROR);
  });

  // Handle unknown api routes
  app.use('/api*', (req, res) => {
    sendMessages(req, res, STATUS_CODES.NOT_FOUND, ERRORS.PAGE_NOT_FOUND);
  });

  return app;
};
