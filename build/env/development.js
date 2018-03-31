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

  phraseApp: {
    accessToken: process.env.PHRASE_ACCESS_TOKEN,
    projectId: process.env.PHRASE_PROJECT_ID
  }
};
