"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(__filename);

_mongoose.default.set("debug", true);

var username = process.env.MONGODB_USERNAME;
var password = process.env.MONGODB_PASSWORD;

_mongoose.default.connect("mongodb://".concat(username, ":").concat(password, "@ds129085.mlab.com:29085/shoppingcart"), function (err, success) {
  if (!err && success) {
    console.log("connection successful");
  } else {
    console.log("error", err);
  }
});

var Schema = _mongoose.default.Schema; // db.disconnect();

var _default = {
  mongoose: _mongoose.default,
  Schema: Schema
};
exports.default = _default;