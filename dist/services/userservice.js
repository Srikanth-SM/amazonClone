"use strict";

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRegisterService = function userRegisterService(user) {
  var newUser = new _user.default(user);
  newUser.save(function (err, suc) {
    if (!err && suc) res.json({
      email: suc.email,
      name: suc.name,
      password: suc.password
    });else {
      next(err);
    }
  });
};