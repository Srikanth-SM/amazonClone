"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _supertest = _interopRequireDefault(require("supertest"));

var _expect = _interopRequireDefault(require("expect"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// var assert = require("assert");
// const request = require("supertest");
// var expect = require("expect");
// var mongoose = require("mongoose");
// const { server } = require("../routes");
require("dotenv").config();

var username = process.env.MONGODB_USERNAME;
var password = process.env.MONGODB_PASSWORD;

_mongoose["default"].connect("mongodb://".concat(username, ":").concat(password, "@ds129085.mlab.com:29085/shoppingcart"), function (err, success) {
  if (!err && success) {
    console.log("connection successful");
  } else {
    console.log("error", err);
  }
});

var user1 = new _user["default"]({
  email: "srisiro26.pec@gmail.com",
  password: "srikanth@123"
});
var user2 = new _user["default"]({
  email: "srinath@gmail.com",
  password: "srinath@123"
});
var users = [user1, user2];

var createUser = function createUser(done) {
  _user["default"].remove({}, function (err, res) {
    user2.save(function (err, res) {
      console.log(err, res);
      done();
    });
  });
};

describe("Model Tests", function () {
  this.timeout(5000);
  before(function (done) {
    _user["default"].remove({}, function (err, res) {
      if (err) {
        done(err);
      }

      done();
    });
  });
  describe("Tests for a user", function () {
    describe("it should register a user", function () {
      it("should return some data", function (done) {
        done();
      });
    });
  });
  after(function (done) {
    _mongoose["default"].connection.close(done);
  });
}); // before(done=>{
//     User.remove({})
//     .then((res)=>{
//       // console.log("res",res);
//       User.insertMany(users,function(err,res){
//         // console.log("results",res);
//         done();
//       });
//     });
// })
// describe('tests', function() {
//   it('should return users length 2', function() {
//     User.find({},function(err,res){
//       if(err)
//         done(err);
//       // console.log(err,res);
//       assert.equal(res.length,2);
//       // done();
//     })
//   });
// });

/*describe(" API Tests", function() {
  describe("POST /register", function() {
    describe("register a user", function() {
      before(function(done) {
        User.remove({}, function(err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
      });
      it("there should not be any users in the users collections", function(done) {
        User.find({})
          .count()
          .then(count => {
            console.log(count);
            expect(count).toEqual(0);
            done();
          });
      });
      describe("should register a user", function() {
        var user;
        before(function(done) {
          request(server)
            .post("/register")
            .send({
              name: "srikanth",
              email: "srisiro26.pec@gmail.com",
              password: "ssssss"
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function(err, res) {
              console.log("stored", res.body);
              if (err) {
                done(err);
              } else {
                user = res.body;
                // expect(res.body.password).toBeDefined();
                done();
              }
            });
        });
        it("should have name field", function(done) {
          console.log(user.name);
          expect(user.name).toEqual("srikanth");
          done();
        });

        it("should have password field to be defined", function(done) {
          console.log(user.email);
          expect(user.password).toBeDefined();
          done();
        });

        it("should have email field", function(done) {
          expect(user.email).toEqual("srisiro26.pec@gmail.com");
          done();
        });

        it("should not register a user with same existing email", function(done) {
          request(server)
            .post("/register")
            .send({
              name: "srikanth",
              email: "srisiro26.pec@gmail.com",
              password: "ssssss"
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(500)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.body.code).toEqual(11000);
              done();
            });
        });
        it.only("should sign in a user", function(done) {
          request(server)
            .post(/signIn/)
            .send({ name: "srikanth", email: "srisiro26.pec@gmail.com" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(done);
        });
      });
    });
  });
});*/