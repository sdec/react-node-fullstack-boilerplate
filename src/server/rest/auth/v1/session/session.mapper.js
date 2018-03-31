import _ from 'lodash';
import recursiveMapper from '../../../shared/v1/util/recursive-mapper';

export default {
  // Controller to DB
  toEntity: (object) =>
    recursiveMapper.map(
      (resource) => ({
        email: resource.email,
        verified: resource.verified,
        verifyEmailSent: resource.verifyEmailSent,
        verifyEmailCode: resource.verifyEmailCode,
        forgotPasswordSent: resource.forgotPasswordSent,
        forgotPasswordCode: resource.forgotPasswordCode,
        strategies: {
          local: {
            setup: _.get(resource, 'strategies.local.setup')
          },
          facebook: {
            userID: _.get(resource, 'strategies.facebook.userID'),
            setup: _.get(resource, 'strategies.facebook.setup')
          },
          google: {
            userID: _.get(resource, 'strategies.google.userID'),
            setup: _.get(resource, 'strategies.google.setup')
          }
        }
      }),
      object
    ),

  // DB to Controller
  toResource: (object) =>
    recursiveMapper.map(
      (entity) => ({
        id: entity._id,
        email: entity.email,
        verified: entity.verified,
        verifyEmailSent: entity.verifyEmailSent,
        verifyEmailCode: entity.verifyEmailCode,
        forgotPasswordSent: entity.forgotPasswordSent,
        forgotPasswordCode: entity.forgotPasswordCode,
        strategies: {
          local: {
            setup: _.get(entity, 'strategies.local.setup')
          },
          facebook: {
            userID: _.get(entity, 'strategies.facebook.userID'),
            setup: _.get(entity, 'strategies.facebook.setup')
          },
          google: {
            userID: _.get(entity, 'strategies.google.userID'),
            setup: _.get(entity, 'strategies.google.setup')
          }
        },
        created: entity.created,
        updated: entity.updated
      }),
      object
    )
};
