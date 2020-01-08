"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(__filename);
// var mongoose = require("mongoose");
// var mongoose = require('mongoose');
var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  email: {
    type: "string",
    lowercase: true,
    unique: true
  },
  address: {
    type: "string"
  },
  profile: {
    name: {
      type: "string",
      lowercase: true,
      "default": ""
    },
    picture: {
      type: "string",
      "default": ""
    }
  },
  name: String,
  password: {
    type: String
  }
}); // var tankSchema = new Schema({ name: "string", size: "string" });
// var Tank = mongoose.model("Tank", tankSchema);

UserSchema.pre("save", function (next) {
  // console.log('save',this);
  // console.log(this);
  var user = this; // console.log(user.isModified());
  // console.log(bcrypt);

  if (!user.isModified("password")) return next();

  _bcryptNodejs["default"].hash(user.password, null, null, function (err, res) {
    // console.log(res);
    user.password = res;
    next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  var user = this;

  var bool = _bcryptNodejs["default"].compareSync(password, this.password);

  return bool;
};

var User = _mongoose["default"].model("User", UserSchema); // var Tank = mongoose.model("Tank", tankSchema);


var _default = {
  User: User
};
exports["default"] = _default;