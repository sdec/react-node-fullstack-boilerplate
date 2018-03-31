import passport from 'passport';
import User from '../rest/shared/v1/models/user';

export default (envConfig, app) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) {
        return cb(err, null);
      }
      return cb(null, user);
    });
  });
};
