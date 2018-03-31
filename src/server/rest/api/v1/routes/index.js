import { Router } from 'express';

export default (envConfig, app) => {
  const router = new Router({
    mergeParams: true,
    strict: app.get('strict routing'),
    caseSensitive: app.get('case sensitive routing')
  });

  return router;
};
