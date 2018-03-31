export const ERRORS = {
  GENERAL_ERROR: {
    defaultMessage: 'An unexpected error has occurred, please contact the website administrator if this persists.',
    code: 'API.ERRORS.GENERAL'
  },
  RESOURCE_NOT_FOUND: {
    defaultMessage: 'Resource not found',
    code: 'API.ERRORS.RESOURCE_NOT_FOUND'
  },
  RESOURCE_DOES_NOT_EXIST: {
    defaultMessage: 'Resource never existed or was removed',
    code: 'API.ERRORS.RESOURCE_DOES_NOT_EXIST'
  },
  PAGE_NOT_FOUND: {
    defaultMessage: 'Page never existed or was removed',
    code: 'API.ERRORS.PAGE_DOES_NOT_EXIST'
  },
  METHOD_NOT_SUPPORTED: {
    defaultMessage: 'Unsupported method',
    code: 'API.ERRORS.METHOD_NOT_SUPPORTED'
  },

  INTERNAL_SERVER_ERROR: {
    defaultMessage: 'An internal server error occurred, please contact the website administrator',
    code: 'API.ERRORS.INTERNAL_SERVER_ERROR'
  },

  NO_VERSION: {
    defaultMessage: 'No API version specified (e.g. v1)',
    code: 'API.ERRORS.NO_VERSION'
  },

  INVALID_VERSION: {
    defaultMessage: 'Invalid API version specified',
    code: 'API.ERRORS.INVALID_VERSION'
  },

  NO_METHOD: {
    defaultMessage: 'No API parameters provided',
    code: 'API.ERRORS.NO_METHOD'
  },

  METHOD_NOT_FOUND: {
    defaultMessage: 'Invalid API method - this method was not found or not accessible',
    code: 'API.ERRORS.METHOD_NOT_FOUND'
  },

  INVALID_METHOD_BODY: {
    defaultMessage: 'Invalid body for this method',
    code: 'API.ERRORS.INVALID_METHOD_BODY'
  },

  INVALID_OBJECT_ID: {
    defaultMessage: 'This API route expects an object ID, but an invalid or empty object ID was passed',
    code: 'API.ERRORS.INVALID_OBJECT_ID'
  },

  VALIDATION_ERRORS: {
    defaultMessage: 'Validation api-error occurred while processing the request',
    code: 'API.ERRORS.VALIDATION_ERRORS'
  },

  USER_EMAIL_NOT_FOUND: {
    defaultMessage: 'Invalid email/password combination or wrong login method',
    code: 'API.ERRORS.USER_EMAIL_NOT_FOUND'
  },

  COULD_NOT_AUTHENTICATE: {
    defaultMessage: 'Invalid email/password combination or wrong login method',
    code: 'API.ERRORS.COULD_NOT_AUTHENTICATE'
  },

  NO_AUTHORIZATION_HEADER_PRESENT: {
    defaultMessage: 'The authorization header is not present',
    code: 'API.ERRORS.NO_AUTHORIZATION_HEADER_PRESENT'
  },

  INVALID_JWT_TOKEN: {
    defaultMessage: 'You do not have sufficient permissions to access the resource',
    code: 'API.ERRORS.INVALID_JWT_TOKEN'
  },

  INSUFFICIENT_PERMISSIONS: {
    defaultMessage: 'You do not have sufficient permissions to access the resource',
    code: 'API.ERRORS.INSUFFICIENT_PERMISSIONS'
  },

  USER_EMAIL_ALREADY_EXISTS: {
    defaultMessage: 'A user already exists for this email',
    code: 'API.ERRORS.USER_EMAIL_ALREADY_EXISTS'
  },

  TOO_MANY_REQUESTS: {
    defaultMessage: 'Too many consecutive requests to this resource - slow down!',
    code: 'API.ERRORS.TOO_MANY_REQUESTS'
  },

  INVALID_RECAPTCHA: {
    defaultMessage: 'Invalid recaptcha response',
    code: 'API.ERRORS.INVALID_RECAPTCHA'
  },

  PROFILE_ALREADY_LINKED: {
    defaultMessage: 'This profile is already linked to a different user',
    code: 'API.ERRORS.PROFILE_ALREADY_LINKED'
  },

  USER_FORGOT_PASSWORD_INVALID_TOKEN: {
    defaultMessage: 'Invalid token provided',
    code: 'API.ERRORS.USER_FORGOT_PASSWORD_INVALID_TOKEN'
  },

  USER_ALREADY_VERIFIED: {
    defaultMessage: 'User already verified',
    code: 'API.ERRORS.USER_ALREADY_VERIFIED'
  },

  UNABLE_TO_SEND_EMAIL: {
    defaultMessage: 'Something went wrong whilst sending an email',
    code: 'API.ERRORS.UNABLE_TO_SEND_EMAIL'
  },

  INVALID_ACTIVATION_CODE: {
    defaultMessage: 'Invalid or expired email verification code',
    code: 'API.ERRORS.INVALID_ACTIVATION_CODE'
  },

  ACTIVATION_MAIL_TOO_FAST: {
    defaultMessage: 'Please wait a while before sending a new activation mail',
    code: 'API.ERRORS.ACTIVATION_MAIL_TOO_FAST'
  },

  USER_TIMED_OUT: {
    defaultMessage: 'User timed out / no longer exists',
    code: 'API.ERRORS.USER_TIMED_OUT'
  },

  USER_LOGOUT_FAILED: {
    defaultMessage: 'Could not logout user',
    code: 'API.ERRORS.USER_LOGOUT_FAILED'
  },

  USER_FORGOT_PASSWORD_EMAIL_FAILURE: {
    defaultMessage: 'Could not send forgot password email',
    code: 'API.ERRORS.USER_FORGOT_PASSWORD_EMAIL_FAILURE'
  },

  USER_FORGOT_PASSWORD_FAILURE: {
    defaultMessage: 'Unable to reset passwords',
    code: 'API.ERRORS.USER_FORGOT_PASSWORD_FAILURE'
  },

  VALIDATE_FIELD_EMPTY: {
    defaultMessage: 'Field can not be empty',
    code: 'API.ERRORS.VALIDATE_FIELD_EMPTY'
  },

  VALIDATE_EMAIL_INVALID: {
    defaultMessage: 'Invalid email',
    code: 'API.ERRORS.VALIDATE_EMAIL_INVALID'
  },

  VALIDATE_PASSWORD_CONFIRM_MATCH: {
    defaultMessage: 'Password & confirmation do not match',
    code: 'API.ERRORS.VALIDATE_PASSWORD_CONFIRM_MATCH'
  }
};
