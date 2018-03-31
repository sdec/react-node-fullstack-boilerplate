import _ from 'lodash';
import request from 'request';
import jwt from 'jsonwebtoken';
import * as moment from 'moment';

import User from './../../../shared/v1/models/user';
import envConfig from './../../../../config/env';
import { ERRORS, mapToResponse, sendMessages, STATUS_CODES, SUCCESSES } from '../../../../modules/response-handler';
import mailService from './../../../shared/v1/services/mail.service';

const defaultAuthOptions = {
  roles: []
};

function generateJwtSecret(req) {
  return envConfig.jwt.secret + req.fingerprint.hash;
}

function generateToken(req, data, cb) {
  jwt.sign({ data }, generateJwtSecret(req), { expiresIn: envConfig.jwt.expires }, cb);
}

function generateGUID() {
  // eslint-disable-next-line no-bitwise
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateRandomGUID() {
  return `${generateGUID() + generateGUID()}-
  ${generateGUID()}-${generateGUID()}-
  ${generateGUID()}-${generateGUID()}${generateGUID()}${generateGUID()}`;
}

function generateForgotPasswordCode() {
  return generateGUID() + generateGUID() + generateGUID() + generateGUID();
}

export default {
  // Makes sure the request authorization header is present
  // Populates request with an 'auth' object
  ensureAuthorizationHeader: () => (req, res, next) => {
    if (!req.headers.authorization) {
      sendMessages(req, res, STATUS_CODES.UNAUTHORIZED, ERRORS.NO_AUTHORIZATION_HEADER_PRESENT, undefined, res);
      return;
    }

    const split = req.headers.authorization.split(' ');

    if (!split || split.length < 1) {
      sendMessages(req, res, STATUS_CODES.UNAUTHORIZED, ERRORS.INVALID_JWT_TOKEN);
      return;
    }

    if (split[0] !== 'Bearer') {
      sendMessages(req, res, STATUS_CODES.UNAUTHORIZED, ERRORS.INVALID_JWT_TOKEN);
      return;
    }

    // Put token on request
    req.session = _.extend(req.session, {
      token: split[1] || ''
    });
    next();
  },

  // Decodes the tokens present on the authorization header, if applicable
  ensureLoggedIn: (options) => {
    const extendedOptions = _.extend(defaultAuthOptions, options);

    return (req, res, next) => {
      if (!req.session) {
        sendMessages(req, res, STATUS_CODES.UNAUTHORIZED, ERRORS.INVALID_JWT_TOKEN, req.session);
        return;
      }

      if (!req.session.token) {
        sendMessages(req, res, STATUS_CODES.UNAUTHORIZED, ERRORS.INVALID_JWT_TOKEN, req.session);
        return;
      }

      const decoded = jwt.decode(req.session.token, envConfig.jwt.secret);

      if (!decoded) {
        sendMessages(req, res, STATUS_CODES.UNAUTHORIZED, ERRORS.INVALID_JWT_TOKEN);
        return;
      }

      const identity = decoded.data;

      if (!identity.roles) {
        identity.roles = defaultAuthOptions.roles;
      }

      const matchingRoles = _.intersection(extendedOptions.roles, identity.roles);
      if (!matchingRoles) {
        sendMessages(req, res, STATUS_CODES.UNAUTHORIZED, ERRORS.INSUFFICIENT_PERMISSIONS);
        return;
      }

      req.session = _.extend(req.session, {
        identity
      });
      next();
    };
  },

  verifyRecaptcha: (req, res, next) => {
    if (envConfig.env.NODE_ENV === 'development') {
      return next();
    }

    const recaptchaPayload = {
      secret: envConfig.recaptcha.secret,
      response: _.get(req.body, 'recaptchaResponse'),
      remoteip: _.get(req.headers, 'x-forwarded-for') || _.get(req, 'connection.remoteAddress') || undefined
    };

    // eslint-disable-next-line max-len
    return request.get(
      `${envConfig.recaptcha.googleVerifyURL}?secret=${recaptchaPayload.secret}&response=${recaptchaPayload.response}`,
      (error, response, body) => {
        const data = JSON.parse(body || '');

        if (error || !data || !data.success) {
          return sendMessages(req, res, STATUS_CODES.BAD_REQUEST, ERRORS.INVALID_RECAPTCHA, error || { valid: false });
        }

        return next();
      }
    );
  },

  verify: (req, res, identity) =>
    generateToken(req, identity, (err, token) => {
      if (err) {
        return sendMessages(req, res, STATUS_CODES.BAD_REQUEST, ERRORS.INVALID_JWT_TOKEN, err);
      }

      req.session = _.extend(req.session, {
        identity,
        token
      });

      return sendMessages(req, res, STATUS_CODES.OK, [], req.session);
    }),

  isTokenValid(req, token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, generateJwtSecret(req), {}, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },

  refreshToken: (req, res, next, identity) =>
    generateToken(req, identity, (err, token) => {
      if (err) {
        return sendMessages(req, res, STATUS_CODES.BAD_REQUEST, ERRORS.INVALID_JWT_TOKEN, err);
      }

      req.session = _.extend(req.session, {
        identity,
        token
      });

      return sendMessages(req, res, STATUS_CODES.OK, [], token);
    }),

  generateGUID: () => generateRandomGUID(),

  logout: (req) => {
    req.logout();
    req.session = undefined;
  },

  forgotPassword: (req) => {
    const forgotPasswordSent = Date.now();
    const forgotPasswordCode = generateForgotPasswordCode();

    return User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return Promise.reject(user);
        }

        return user
          .update({ forgotPasswordSent, forgotPasswordCode })
          .then(() => Promise.resolve({ ...user._doc, forgotPasswordSent, forgotPasswordCode }));
      })
      .then((user) => {
        const locale = 'en';
        return mailService.send(req.body.email, locale, envConfig.assets.emailTemplates.forgotPassword, {
          user,
          forgotPasswordLink: `${req.headers.origin}/${locale}/authenticate/forgot-password/reset?utm_source=email&c=${
            user.forgotPasswordCode
          }`
        });
      });
  },

  forgotPasswordReset: (req, res, next) => {
    return User.findOne({ forgotPasswordCode: req.body.token })
      .then((user) => {
        if (!user) {
          return Promise.reject(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.USER_TOKEN_NOT_FOUND, user, req));
        }

        // Check if code has expired
        const untilValidMoment = moment(user.forgotPasswordSent).add(envConfig.nodemailer.activationCodeValidMs, 'ms');

        if (!moment().isBefore(untilValidMoment)) {
          return Promise.reject(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.USER_TOKEN_EXPIRED, user, req));
        }

        return new Promise((resolve, reject) => {
          User.schema.methods.generateHash(req.body.password, (err, hashedPassword) => {
            if (err) {
              reject(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.USER_FORGOT_PASSWORD_EMAIL_FAILURE, user, req));
            }

            User.update(
              { _id: user._id },
              {
                forgotPasswordCode: undefined,
                forgotPasswordSent: undefined,
                'strategies.local.password': hashedPassword,
                'strategies.local.verified': true
              }
            )
              .then((response) => resolve(mapToResponse(STATUS_CODES.OK, SUCCESSES.USER_FORGOT_PASSWORD_SUCCESS, response, req)))
              .catch((response) => reject(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.USER_FORGOT_PASSWORD_FAILURE, response, req)));
          });
        });
      })
      .catch((response) => Promise.reject(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.USER_FORGOT_PASSWORD_FAILURE, response, req)));
  }
};
