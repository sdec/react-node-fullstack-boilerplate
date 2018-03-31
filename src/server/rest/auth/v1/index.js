import { Router } from 'express';
import { ERRORS, sendMessages, STATUS_CODES } from '../../../modules/response-handler';

import sessionConfig from './session';

export default (envConfig, app) => {
  const router = new Router({
    mergeParams: true,
    strict: app.get('strict routing'),
    caseSensitive: app.get('case sensitive routing')
  });

  // No method
  router.all('/', (req, res) => {
    sendMessages(req, res, STATUS_CODES.NOT_FOUND, ERRORS.NO_METHOD);
  });

  // Configure all modules-delocalized
  sessionConfig(envConfig, app, router);

  // Method not supported
  router.all('/*', (req, res) => {
    sendMessages(req, res, STATUS_CODES.NOT_FOUND, ERRORS.METHOD_NOT_SUPPORTED);
  });

  return router;
};
