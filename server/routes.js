var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var cors = require('cors');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('./config/passport');

var config = require('./config/config');



var user = require('./controllers/user');
var errors = require('./errors/errors');




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
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
	cookie:{maxAge:600000},
	store:new MongoStore({'db':config.database })
}));

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
//   });

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get('/', user.home);

app.post("/register",user.register);

// app.post("/signIn",user.signIn);
app.post('/signIn',passport.authenticate('local-login',{successRedirect:'/login',failureRedirect:'/'});

app.get("/profile",user.profile);

app.post("/signUp",user.register);

// app.use(function(err,req,res,next){
// 	console.log(err);
// });
app.use(errors.validationErrors);
var server = app.listen(3000);
// console.log("routes",app);

module.exports = {
	server
}
