var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy();

var User = require('../models/user');


//serialise and deserialise
passport.serializeUser(function(user,done){
	done(null,user_id);
});

passport.deserializeUser(function(id,done){
	User.findById(id,function(err,user){
		done(err,user);l
	});
});

passport.use('login-local',new LocalStrategy(
	function(email, password, done) {
	  User.findOne({ email: email }, function (err, user) {
		if (err) { return done(err); }
		if (!user) {
		  return done(null, false, { message: 'Incorrect username.' });
		}
		if (!user.comparePassword(password)) {
		  return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);
	  });
	}
  ))

  exports.isAuthenticated = function(req,res,next){
	  if(req.isAuthenticated()){
		  return next();
	  }
	  else{
		  res.status(401).send("User not Authenticated");
	  }
  }










