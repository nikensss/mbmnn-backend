import { Schema } from 'mongoose';
import mongoose from '../database/mongodb';
import encrypt from '../auth/encrypt';

const User = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

User.pre('save', function(next) {
  encrypt
    .hash(this.password)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(err => next(err));
});

User.methods.checkPassword = function(password) {
  return encrypt.compare(password, this.password);
}

export default mongoose.model('User', User);
