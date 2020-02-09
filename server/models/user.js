import bcrypt from 'bcrypt';
// var bcrypt = require("bcrypt-nodejs");

import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: 'string',
    lowercase: true,
    unique: true,
    minlength: 4,
  },
  address: {
    type: 'string',
  },
  profile: {
    name: {
      type: 'string',
      lowercase: true,
      default: '',
    },
    picture: {
      type: 'string',
      default: '',
    },
  },
  name: {
    type: String,
    minlength: 4,
  },
  password: {
    type: String,
  },
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) next();
  bcrypt.hash(user.password, 10, (err, res) => {
    user.password = res;
    next();
  });
});

UserSchema.methods.comparePassword = async function comparePassword(password) {
  try {
    const bool = await bcrypt.compare(password, this.password);
    console.log(bool);
    return bool;
  } catch (err) {
    throw new Error(err);
  }
};

export default mongoose.model('User', UserSchema);
