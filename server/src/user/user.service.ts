import { getConnection, Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import logger from '../logger';
import User from './user.entity';

interface Credential {
  email: string;
  password: string;
}
let userRepository;

export const registerUserService = async (newuser: User): Promise<User> => {
  logger.info('registerUserService');
  const userRepository = getUserRepository();
  //check if user already exists
  const { name, password, email } = newuser;

  const isUserExist = await userRepository.findOne({ email });
  if (isUserExist) {
    throw Error('User already exist');
  }
  logger.info(process.env.PASSWORD_SALT);
  const hashPassword = bcrypt.hashSync(password, 10);
  const user = new User(name, hashPassword, email);
  await userRepository.save(user);
  return user;
};

export const AuthUserService = async (
  email: string,
  password: string
): Promise<{ email: string; name: string }> => {
  const userRepository = getUserRepository();

  let user = await userRepository.findOne({ email });
  user = user;
  if (!user) {
    throw Error('user not registered');
  }
  const isPasswordMatched = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatched) {
    throw Error('Error while logging in, username or password incorrect');
  }

  return { email: (<User>user).email, name: (<User>user).name };
};

export const CreateUserSession = async (email: string): Promise<string> => {
  logger.info('CreateUserSession');
  const sessionToken = jwt.sign(email, 'secret');
  await userRepository.update({ email }, { sessionToken });
  return sessionToken;
};

export const signInUserService = async (
  credential: Credential
): Promise<{ email: string; sessionToken: string; name: string }> => {
  logger.info('signInUserService');
  const { email, password } = credential;
  const { name } = await AuthUserService(email, password);
  const sessionToken = await CreateUserSession(email);
  return { email, sessionToken, name: name };
};

const getUserRepository = (): Repository<User> => {
  if (!userRepository) {
    userRepository = getConnection().getRepository('User');
  }
  return userRepository;
};
