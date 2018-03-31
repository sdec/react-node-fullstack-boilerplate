import { ERRORS } from '../../../../modules/response-handler';

export default {
  local: {
    signup: (req) => {
      req.sanitize('firstName').trim();
      req.checkBody('firstName', ERRORS.VALIDATE_FIELD_EMPTY).notEmpty();

      req.sanitize('lastName').trim();
      req.checkBody('lastName', ERRORS.VALIDATE_FIELD_EMPTY).notEmpty();

      req.sanitize('email').trim();
      req.checkBody('email', ERRORS.VALIDATE_FIELD_EMPTY).notEmpty();
      req.checkBody('email', ERRORS.VALIDATE_EMAIL_INVALID).isEmail();

      req.sanitize('password').trim();
      req.checkBody('password', ERRORS.VALIDATE_FIELD_EMPTY).notEmpty();

      req.sanitize('passwordRepeat').trim();
      req.checkBody('passwordRepeat', ERRORS.VALIDATE_PASSWORD_CONFIRM_MATCH).equals(req.body.password);

      return req.validationErrors();
    },

    login: (req) => {
      req.sanitize('email').trim();
      req.checkBody('email', ERRORS.VALIDATE_FIELD_EMPTY).notEmpty();
      req.checkBody('email', ERRORS.VALIDATE_EMAIL_INVALID).isEmail();

      req.sanitize('password').trim();
      req.checkBody('password', ERRORS.VALIDATE_FIELD_EMPTY).notEmpty();

      return req.validationErrors();
    }
  },

  forgotPassword: (req) => {
    req.sanitize('email').trim();
    req.checkBody('email', ERRORS.VALIDATE_FIELD_EMPTY).notEmpty();
    req.checkBody('email', ERRORS.VALIDATE_EMAIL_INVALID).isEmail();

    return req.validationErrors();
  },

  forgotPasswordReset: (req) => {
    req.sanitize('token').trim();
    req.checkBody('token', ERRORS.USER_FORGOT_PASSWORD_INVALID_TOKEN).notEmpty();

    req.sanitize('password').trim();
    req.checkBody('password', ERRORS.VALIDATE_FIELD_EMPTY).notEmpty();

    req.sanitize('passwordRepeat').trim();
    req.checkBody('passwordRepeat', ERRORS.VALIDATE_PASSWORD_CONFIRM_MATCH).equals(req.body.password);

    return req.validationErrors();
  }
};
