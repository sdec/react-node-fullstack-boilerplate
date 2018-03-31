import mongoose from 'mongoose';

export default (envConfig, app) => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(envConfig.db.url, envConfig.db.options)
    .then(() => {
      console.log('Connected to database with URL '.info + envConfig.db.url.debug);
    })
    .catch((err) => {
      console.error('Failed to connect to database: ', err);
    });
};
