"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(__filename);
var LocalStrategy = _passportLocal.default.Strategy; // var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// console.log(LocalStrategy);
// var User = require("../models/user");
//serialise and deserialise
// console.log("inside passport.js");

_passport.default.serializeUser(function (user, done) {
  done(null, user_id);
});

_passport.default.deserializeUser(function (id, done) {
  _user.default.findById(id, function (err, user) {
    done(err, user);
  });
}); // console.log("LocalStrategy",LocalStrategy);


_passport.default.use("login-local", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, function (req, email, password, done) {
  // console.log(req);
  _user.default.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, {
        message: "Incorrect username."
      });
    }

    if (!user.comparePassword(password)) {
      return done(null, false, {
        message: "Incorrect password."
      });
    }

    return done(null, user);
  });
}));

exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send("User not Authenticated");
  }
};