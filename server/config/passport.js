import passport from 'passport';
import passportLocal from 'passport-local';

import User from '../models/user';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  // eslint-disable-next-line no-underscore-dangle
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    // eslint-disable-next-line no-underscore-dangle
    done(err, user._id);
  });
});

passport.use(
  'login-local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, next) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          const error = new Error('Invalid Credentials');
          error.httpStatusCode = 401;
          return next(error);
        }
        user
          .comparePassword(password)
          .then((res) => {
            if (res) {
              return next(null, user);
            }
            const error = new Error('Invalid Credentials');
            error.httpStatusCode = 401;
            return next(error);
          })
          .catch((error) => {
            return next(error);
          });
      });
    },
  ),
);

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) next();
  res.status(401).send('User not Authenticated');
};

export default passport;
