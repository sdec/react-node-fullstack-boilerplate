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

  phraseApp: {
    accessToken: process.env.PHRASE_ACCESS_TOKEN,
    projectId: process.env.PHRASE_PROJECT_ID
  }
};
