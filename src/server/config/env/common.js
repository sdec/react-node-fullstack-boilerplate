const trustedSites = [
  'google.com',
  'google.be',
  '*.google.com',
  '*.google.be',
  'facebook.com',
  '*.facebook.com',
  'facebook.net',
  '*.facebook.net',
  'gstatic.com',
  '*.gstatic.com',
  'googleapis.com',
  '*.googleapis.com',
  'google-analytics.com',
  '*.google-analytics.com',
  '*.g.doubleclick.net'
];

module.exports = {
  express: {
    port: process.env.PORT || 5000,
    showStackError: true,

    static: {
      etag: true,
      maxAge: 31557600
    },

    middleware: {
      helmet: {
        contentSecurityPolicy: {
          directives: {
            /* eslint-disable quotes */
            defaultSrc: trustedSites.concat(["'self'", 'data:']),
            styleSrc: trustedSites.concat(["'self'", 'data:', "'unsafe-inline'"]),
            imgSrc: trustedSites.concat(["'self'", 'data:']),
            frameSrc: trustedSites.concat(["'self'", 'data:']),
            scriptSrc: trustedSites.concat(["'self'", "'unsafe-eval'", "'unsafe-inline'"])
            /* eslint-enable quotes */
          }
        },
        expectCt: true,
        dnsPrefetchControl: true,
        frameguard: true,
        hidePoweredBy: true,
        hpkp: false,
        hsts: true,
        ieNoOpen: true,
        noCache: false,
        noSniff: true,
        referrerPolicy: true,
        xssFilter: true
      },
      bodyParser: {
        urlencoded: {
          extended: true
        },
        json: {
          limit: '128kb'
        }
      },
      validator: {
        errorFormatter: (field, message, value) => ({
          field,
          message,
          value
        })
      },
      compression: undefined,
      fingerprint: {},
      morgan: undefined,
      paginate: {
        paginateLimit: 10,
        paginateMax: 50
      }
    }
  },

  auth: {
    resourcePath: '/auth',
    availableVersions: ['v1']
  },

  api: {
    resourcePath: '/api',
    availableVersions: ['v1'],

    modelExtension: '.model.js',
    seedExtension: '.seed.json',

    roles: {
      admin: 'admin'
    }
  },

  db: {
    url: undefined,
    options: {
      auto_reconnect: true
    }
  },

  jwt: {
    secret: '',
    expires: '1h'
  },

  social: {
    facebook: {
      appId: '',
      version: '',
      secret: '',
      facebookGraphURL: 'https://graph.facebook.com/me'
    },
    google: {
      clientID: '',
      googleGraphURL: 'https://www.googleapis.com/oauth2/v3/tokeninfo'
    }
  },

  recaptcha: {
    key: '',
    secret: '',
    googleVerifyURL: 'https://www.google.com/recaptcha/api/siteverify'
  },

  newrelic: {},

  nodemailer: {
    transport: {
      noReply: {},
      mandrill: {}
    },
    // https://github.com/Automattic/juice
    juice: {},
    activationCodeValidMs: 1000 * 60 * 60 * 10
  },

  assets: {
    emailTemplates: {
      verifyEmail: 'assets/email-templates/verify-email/',
      forgotPassword: 'assets/email-templates/forgot-password/'
    }
  }
};
