import User from "../models/user";

const userRegisterService = function(user) {
  const newUser = new User(user);
  newUser.save(function(err, suc) {
    if (!err && suc)
      res.json({ email: suc.email, name: suc.name, password: suc.password });
    else {
      next(err);
    }
  });
};
