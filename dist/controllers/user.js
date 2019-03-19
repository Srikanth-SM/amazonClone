"use strict";

console.log(__filename);

var _require = require("../models/user"),
    User = _require.User;

module.exports.home = function (req, res, next) {
  // next("srikanth");
  console.log("Inside home");
  res.json("srikanth"); // res.render('error',{msg:"error"});
};

module.exports.register = function (req, res, next) {
  console.log("register", req);
  var user = new User(req.body);
  user.profile.name = req.body.name;
  user.save(function (err, suc) {
    if (!err && suc) res.json({
      email: suc.email,
      name: suc.name,
      password: suc.password
    });else {
      next(err);
    }
  });
};

module.exports.signIn = function (req, res, next) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (!err && user) {
      if (user.comparePassword(req.body.password)) {
        // console.log("result",result);
        // req.session.userid
        // console.log(req.session,result);
        res.json({
          success: true
        }); // next();
      } else {
        console.log("error", err);
        next(new Error("wrong password entered by the user"));
      }
    } else {
      console.log("error", err);
      res.status(404).send({
        error: "user not found"
      });
    }
  });
};

module.exports.authenticate = function (req, res, next) {
  var user = new User(req.body);
  console.log("authenticate", user);
  User.findOne({
    email: user.email
  }, function (err, userDetails) {
    if (!err && userDetails) {
      req.session.userId = userDetails._id;
      next();
    } else {
      // console.log(err);
      next(new Error("User is not authenticated, Please signup"));
    }
  });
};

module.exports.profile = function (req, res, next) {
  if (!req.session) {
    next(new Error("Please sign in again, session expired"));
  }

  if (!req.session.userId) {
    next(new Error("You are not authenticated to view this"));
  } else {
    res.send(req.body);
  }
};