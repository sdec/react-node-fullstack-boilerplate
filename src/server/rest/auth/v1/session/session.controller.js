import passport from 'passport';

import sessionService from './session.service';
import { mapToResponse, sendResponse, STATUS_CODES } from '../../../../modules/response-handler';
import { sendMessages } from '../../../../modules/response-handler/index';
import { ERRORS, SUCCESSES } from '../../../../../shared/modules/messages';
import sessionValidator from './session.validate';

export default {
  local: {
    signup: (req, res, next) => {
      passport.authenticate('local-signup', {}, (response) => {
        // Something went wrong
        if (response.code !== STATUS_CODES.OK.code) {
          sendResponse(res, response);
        }

        return sessionService.verify(req, res, response.payload);
      })(req, res, next);
    },

    login: (req, res, next) => {
      passport.authenticate('local-login', {}, (response) => {
        // Something went wrong
        if (response.code !== STATUS_CODES.OK.code) {
          sendResponse(res, response);
        }

        return sessionService.verify(req, res, response.payload);
      })(req, res, next);
    }
  },

  verifyToken: (req, res, next) => {
    const body = req.body;
    if (!body.token) {
      return sendMessages(req, res, STATUS_CODES.UNAUTHORIZED, ERRORS.INVALID_JWT_TOKEN, body);
    }

    return sessionService
      .isTokenValid(req, body.token)
      .then(() => sendMessages(req, res, STATUS_CODES.OK, [], true))
      .catch(() => sendMessages(req, res, STATUS_CODES.OK, ERRORS.INVALID_JWT_TOKEN, false));
  },

  logout: (req, res, next) => {
    sessionService.logout(req);
    return sendMessages(req, res, STATUS_CODES.OK);
  },

  forgotPassword: (req, res, next) => {
    // Validate input
    const validationErrors = sessionValidator.forgotPassword(req);
    if (validationErrors) {
      return sendMessages(req, res, STATUS_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERRORS, validationErrors);
    }

    return sessionService
      .forgotPassword(req)
      .then((response) => sendMessages(req, res, STATUS_CODES.OK, SUCCESSES.USER_FORGOT_PASSWORD_EMAIL_SENT, response))
      .catch((response) => sendMessages(req, res, STATUS_CODES.BAD_REQUEST, ERRORS.USER_FORGOT_PASSWORD_EMAIL_FAILURE, response));
  },

  forgotPasswordReset: (req, res, next) => {
    // Validate input
    const validationErrors = sessionValidator.forgotPasswordReset(req);
    if (validationErrors) {
      return sendMessages(req, res, STATUS_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERRORS, validationErrors);
    }

    return sessionService
      .forgotPasswordReset(req)
      .then((response) => sendResponse(res, response))
      .catch((response) => sendResponse(res, response));
  }
};
