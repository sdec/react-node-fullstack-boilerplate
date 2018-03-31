module.exports = {
  process: {
    env: {
      NODE_ENV: undefined,
      NODE_SRC: './src'
    }
  },

  gulp: {
    clean: {
      options: {
        read: false,
        allowEmpty: true
      }
    }
  },

  webpackDevServer: {
    contentBase: './dist',
    port: 8080,
    host: 'localhost',
    hot: true,
    inline: true,
    quiet: false,
    historyApiFallback: true,
    noInfo: false,
    stats: {
      colors: true
    },
    overlay: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:5000'
      },
      '/auth/*': {
        target: 'http://localhost:5000'
      }
    }
  },

  webpackHotServer: {
    multistep: true,
    noInfo: false,
    reload: true
  },

  paths: {
    src: './src',
    dist: './dist',

    client: {
      src: './src/client',
      i18n: './src/client/core/i18n'
    },

    server: {
      src: './src/server'
    },

    public: {
      src: './src/public'
    }
  },

  phraseApp: {
    accessToken: undefined,
    projectId: undefined
  }
};
