import { Router } from 'express';
import { ERRORS, sendMessages, STATUS_CODES } from '../../modules/response-handler';

import v1Router from './v1';

export default (envConfig, app) => {
  const router = new Router({
    mergeParams: true,
    strict: app.get('strict routing'),
    caseSensitive: app.get('case sensitive routing')
  });

  // No version
  router.all('/', (req, res) => {
    sendMessages(req, res, STATUS_CODES.NOT_FOUND, ERRORS.NO_VERSION);
  });

  // Route versions
  router.use('/v1', v1Router(envConfig, app));

  // Invalid version
  router.all('/*', (req, res) => {
    sendMessages(req, res, STATUS_CODES.NOT_FOUND, ERRORS.INVALID_VERSION);
  });

  return router;
};
