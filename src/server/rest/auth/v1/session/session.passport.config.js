import _ from 'lodash';
import passport from 'passport';
import passportCustom from 'passport-custom';

import User from '../../../shared/v1/models/user';
import sessionValidator from './session.validate';

import { ERRORS, mapToResponse, STATUS_CODES, SUCCESSES } from '../../../../modules/response-handler';

export default (envConfig, app, router) => {
  const CustomStrategy = passportCustom.Strategy;
  passport.use(
    'local-signup',
    new CustomStrategy((req, done) => {
      if (!req.body) {
        return done(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.INVALID_METHOD_BODY, req.body, req));
      }

      // Validate input
      const validationErrors = sessionValidator.local.signup(req);
      if (validationErrors) {
        return done(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERRORS, validationErrors, req));
      }

      // Check if user exists
      return User.findOne({ email: req.body.email })
        .then((response) => {
          // User already exists
          if (response) {
            return done(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.USER_EMAIL_ALREADY_EXISTS, undefined, req));
          }

          return User.schema.methods.generateHash(req.body.password, (err, hashedPassword) => {
            if (err) {
              return done(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.INVALID_METHOD_BODY, err, req));
            }

            const session = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              verified: false,
              strategies: {
                local: {
                  password: hashedPassword,
                  setup: true
                }
              }
            });

            return session
              .save()
              .then((response2) => {
                done(mapToResponse(STATUS_CODES.OK, SUCCESSES.USER_CREATED, response2, req));
              })
              .catch((response2) => {
                done(mapToResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ERRORS.GENERAL_ERROR, response2, req));
              });
          });
        })
        .catch((response) => {
          done(mapToResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ERRORS.GENERAL_ERROR, response, req));
        });
    })
  );

  passport.use(
    'local-login',
    new CustomStrategy((req, done) => {
      if (!req.body) {
        return done(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.INVALID_METHOD_BODY, req.body, req));
      }

      // Validate input
      const validationErrors = sessionValidator.local.login(req);
      if (validationErrors) {
        return done(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERRORS, validationErrors, req));
      }

      // Check if user exists
      return User.findOne({ email: req.body.email })
        .then((response) => {
          // User already exists
          if (!response) {
            return done(mapToResponse(STATUS_CODES.BAD_REQUEST, ERRORS.USER_EMAIL_NOT_FOUND, undefined, req));
          }

          return User.schema.methods.validPassword(req.body.password, _.get(response, 'strategies.local.password'), (err2, valid) => {
            if (err2 || !valid) {
              return done(mapToResponse(STATUS_CODES.UNAUTHORIZED, ERRORS.COULD_NOT_AUTHENTICATE, req.body, req));
            }
            return done(mapToResponse(STATUS_CODES.OK, SUCCESSES.USER_LOGGED_IN, response, req));
          });
        })
        .catch((response) => {
          done(mapToResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ERRORS.GENERAL_ERROR, response, req));
        });
    })
  );
};
