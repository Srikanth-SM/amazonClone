import Express from 'express';
import cors from 'cors';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';
import logger from '../logger';
import passport from '../config/passport';
import user from '../controllers/user';
import errors from '../errors/errors';
import User from '../models/user';

require('dotenv').config();
import productRoute from './productRoute';
import cartRoute from './cartRoute';
// import config from './config/config';

const MongoStore = mongoStore(session);

const app = new Express();

app.use(function(req, res, next) {
  console.log('executing mongo');
  User.findOne({ email: 'srisiro26.pec@gmail.com' })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      logger.error(error);
    });
  // next();
});
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(
//   bodyParser.urlencoded({
//     // to support URL-encoded bodies
//     extended: true,
//   }),
// );
// logger.error('routes error');

app.get('/', user.home);

// app.post('/register', user.register);

// app.post('/login', passport.authenticate('login-local'), user.login);

app.use('/product', productRoute);
app.use('/cart', cartRoute);

app.use(errors.validationErrors);
export default app;
