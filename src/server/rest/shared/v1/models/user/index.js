import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import mongooseFindOrCreate from 'mongoose-findorcreate';
import bcrypt from 'bcrypt-nodejs';

import schemaDefinition from './schema-definition';

// Create schema
const schema = new mongoose.Schema(schemaDefinition);

// Add hooks
schema.pre('update', function(next) {
  this.updated = Date.now();
  next();
});

schema.methods.generateHash = (password, cb) => {
  bcrypt.genSalt(8, (salt) => {
    bcrypt.hash(password, salt, () => true, (err, hashedPassword) => cb(err, hashedPassword));
  });
};

schema.methods.validPassword = (password1, password2, cb) => {
  if (!password1 || !password2) {
    return cb(null, false);
  }
  return bcrypt.compare(password1, password2, cb);
};

// https://www.npmjs.com/package/mongoose-paginate
schema.plugin(mongoosePaginate);
schema.plugin(mongooseFindOrCreate);

export default mongoose.model('User', schema);
