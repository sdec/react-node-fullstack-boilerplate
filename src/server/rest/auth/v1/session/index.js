import passportConfig from './session.passport.config';
import sessionController from './session.controller';

export default (envConfig, app, router) => {
  // Configure passport
  passportConfig(envConfig, app, router);

  // Configure routes
  router.post('/local/signup', sessionController.local.signup);
  router.post('/local/login', sessionController.local.login);

  router.post('/logout', sessionController.logout);

  router.post('/verify-token', sessionController.verifyToken);
  router.post('/forgot-password', sessionController.forgotPassword);
  router.post('/forgot-password/reset', sessionController.forgotPasswordReset);
};
