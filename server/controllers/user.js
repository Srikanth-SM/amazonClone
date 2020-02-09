import UserService from '../services/userservice';

const home = (req, res) => {
  res.json('srikanth');
};

const register = (req, res, next) => {
  const user = { ...req.body };
  console.log(user);
  UserService.registrationService(user)
    .then((savedUser) => {
      res.json(savedUser);
    })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res) => {
  console.log('login');
  const user = req.user;
  if (user) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
};

const authenticate = (req, res, next) => {
  const user = new User(req.body);

  User.findOne({ email: user.email }, (err, userDetails) => {
    if (!err && userDetails) {
      // eslint-disable-next-line no-underscore-dangle
      req.session.userId = userDetails._id;
      next();
    } else {
      // console.log(err);
      next(new Error('User is not authenticated, Please signup'));
    }
  });
};

const profile = (req, res, next) => {
  if (!req.session) {
    next(new Error('Please sign in again, session expired'));
  }
  if (!req.session.userId) {
    next(new Error('You are not authenticated to view this'));
  } else {
    res.send(req.body);
  }
};

export default {
  home,
  register,
  profile,
  authenticate,
  login,
};
