module.exports = {
  process: {
    env: {
      NODE_ENV: 'production'
    }
  },

  express: {
    middleware: {
      compression: {
        level: 9 // Full compression
      },
      morgan: 'combined'
    }
  },

  db: {
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    seed: false
  },

  jwt: {
    secret: process.env.JWT_SECRET
  },

  recaptcha: {
    key: process.env.RECAPTCHA_KEY,
    secret: process.env.RECAPTCHA_SECRET
  },

  social: {
    facebook: {
      appId: process.env.OAUTH_FACEBOOK_APP_ID,
      version: process.env.OAUTH_FACEBOOK_VERSION,
      secret: process.env.OAUTH_FACEBOOK_SECRET
    },
    google: {
      clientID: process.env.OAUTH_GOOGLE_CLIENT_ID
    }
  },

  newrelic: {
    enabled: true
  },

  nodemailer: {
    transport: {
      noReply: {
        host: process.env.NODEMAILER_SMTP_HOST,
        port: process.env.NODEMAILER_SMTP_PORT,
        secure: process.env.NODEMAILER_SMTP_SECURE,
        auth: {
          user: process.env.NODEMAILER_SMTP_USER,
          pass: process.env.NODEMAILER_SMTP_PASS,
          from: process.env.NODEMAILER_SMTP_OPTIONS_NOREPLY_FROM
        },
        tls: {
          rejectUnauthorized: process.env.NODEMAILER_SMTP_TLS_REJECT_UNAUTHORIZED
        }
      }
    },
    // https://github.com/Automattic/juice
    juice: {}
  }
};
