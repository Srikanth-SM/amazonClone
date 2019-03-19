console.log(__filename);
import passport from "passport";
import passportLocal from "passport-local";

import User from "../models/user";

var LocalStrategy = passportLocal.Strategy;
// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// console.log(LocalStrategy);
// var User = require("../models/user");

//serialise and deserialise
// console.log("inside passport.js");
passport.serializeUser(function(user, done) {
  done(null, user_id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// console.log("LocalStrategy",LocalStrategy);
passport.use(
  "login-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      // console.log(req);
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.comparePassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send("User not Authenticated");
  }
};
