"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
console.log(__filename);
var username = process.env.MONGODB_USERNAME;
var password = process.env.MONGODB_PASSWORD;
var _default = {
  database: "mongodb://".concat(username, ":").concat(password, "@ds129085.mlab.com:29085/shoppingcart"),
  // host: "http://localhost",
  port: 27017
};
exports["default"] = _default;