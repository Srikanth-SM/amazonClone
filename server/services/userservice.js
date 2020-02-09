import User from '../models/user';

const registrationService = async user => {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return { email: savedUser.email, name: savedUser.name, status: true };
  } catch (e) {
    throw new Error(e);
  }
};

export default {
  registrationService,
};
