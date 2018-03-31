module.exports = {
  process: {
    env: {
      NODE_ENV: 'development'
    }
  },

  express: {
    middleware: {
      compression: {
        level: 0 // No compression
      },
      morgan: 'dev'
    }
  },

  db: {
    url: 'mongodb://localhost:27017/react-node-fullstack-boilerplate-dev',
    seed: true
  },

  jwt: {
    secret: 'dezfkjzehjdlkazjhfjkzehfldansckzjbkezfhnbkherzvghzkjkzandDNJKFnjkNFZEKJbKJQBNFDKZEBF'
  },

  recaptcha: {
    key: '6LeISx8UAAAAAASYHA4h0cJQ596kcODr8c5Y-oEv',
    secret: '6LeISx8UAAAAAMjcLkJ8v9Bl5tXRC0UIrZcoP7vx'
  },

  social: {
    facebook: {
      appId: '1977451492474487',
      version: 'v2.9',
      secret: '8af315a59598affe0bb872c01e21d626'
    },
    google: {
      clientID: '266234188014-d0vaba4oefpt5st7ealsa4194820j7b4.apps.googleusercontent.com'
    }
  },

  newrelic: {
    enabled: false
  },

  nodemailer: {
    transport: {
      noReply: {
        host: 'your.smtp.host',
        port: 465,
        secure: true,
        auth: {
          user: 'user@mail.com',
          pass: '123456',
          from: 'Your name <user@mail.com>'
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    },
    // https://github.com/Automattic/juice
    juice: {}
  }
};
