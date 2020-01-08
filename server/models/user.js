console.log(__filename);
import bcrypt from "bcrypt-nodejs";
// var bcrypt = require("bcrypt-nodejs");

import mongoose from "mongoose";
// var mongoose = require("mongoose");

// var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: "string",
    lowercase: true,
    unique: true,
    minlength: 4
  },
  address: {
    type: "string"
  },
  profile: {
    name: {
      type: "string",
      lowercase: true,
      default: ""
    },
    picture: {
      type: "string",
      default: ""
    }
  },
  name: {
    type: String,
    minlength: 4
  },
  password: {
    type: String
  }
});

UserSchema.pre("save", function(next) {
  var user = this;
  // console.log(user.isModified());
  // console.log(bcrypt);
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, null, null, function(err, res) {
    console.log(res);
    user.password = res;
    next();
  });
});

UserSchema.methods.comparePassword = async function(password) {
  var user = this;
  var bool = await bcrypt.compare(password, this.password);
  return bool;
};

export default mongoose.model("User", UserSchema);
