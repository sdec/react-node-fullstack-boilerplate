export default {
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifyEmailSent: Date,
  verifyEmailCode: String,
  forgotPasswordSent: Date,
  forgotPasswordCode: String,
  strategies: {
    local: {
      password: String,
      setup: {
        type: Boolean,
        default: false
      }
    },
    facebook: {
      userID: String,
      setup: {
        type: Boolean,
        default: false
      }
    },
    google: {
      userID: String,
      setup: {
        type: Boolean,
        default: false
      }
    }
  },
  roles: Array,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
};
