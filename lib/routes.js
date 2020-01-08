"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./controllers/user"));

var _errors = _interopRequireDefault(require("./errors/errors"));

var _addProduct = _interopRequireDefault(require("./controllers/addProduct"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(__filename);

var express = require("express");

var app = new express();

var bodyParser = require("body-parser");

var ejs = require("ejs");

var engine = require("ejs-mate");

var cors = require("cors");

var session = require("express-session");

var MongoStore = require("connect-mongo")(session);

var passport = require("./config/passport");

var LocalStrategy = require("passport-local").Strategy;

var config = require("./config/config");

// app.use(express.static(__dirname + '/public'));
// ejs // using ejs-mate engine
// app.engine('ejs', engine);
// app.set('view engine', 'ejs');
app.use(cors());
app.use(function (req, res, next) {
  // console.log('Time:', Date.now());
  next();
});
app.use(session({
  secret: "work hard",
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
})); // app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
//   });

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({
  // to support URL-encoded bodies
  extended: true
}));
app.get("/", _user["default"].home);
app.post("/register", _user["default"].register);
app.post("/signIn", _user["default"].signIn);
console.log(passport.authenticate); // app.post('/signIn',passport.authenticate('local-login',{successRedirect:'/login',failureRedirect:'/'}));
// app.get("/profile", user.profile);
// app.post("/signUp", user.register);
// app.get("/allProducts", products.get);
// app.get("/product/:id", products.getProduct);
// app.post("/addProduct",)
// app.use(function(err,req,res,next){
// 	console.log(err);
// });

app.use(_errors["default"].validationErrors);
var server = app.listen(3000); // console.log("routes",app);
// module.exports = {
//   server
// };

var _default = {
  server: server
};
exports["default"] = _default;