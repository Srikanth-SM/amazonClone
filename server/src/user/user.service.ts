import { getConnection, Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import logger from '../logger';
import User from './user.entity';
import { isObject } from 'util';

interface Credential {
  email: string;
  password: string;
}
let userRepository;
const secret = process.env.JWT_SECRET;

export const registerUserService = async (newuser: User): Promise<User> => {
  logger.info('registerUserService');
  userRepository = getUserRepository();
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
  const sessionToken = jwt.sign({ email }, secret, { expiresIn: 60 });
  await userRepository.update({ email }, { sessionToken });
  return sessionToken;
};

export const signInUserService = async (
  credential: Credential
): Promise<{ email: string; sessionToken: string; name: string }> => {
  logger.info('signInUserService');
  const { email, password } = credential;
  // check for registered user
  const { name } = await AuthUserService(email, password);
  // create session
  const sessionToken = await CreateUserSession(email);
  return { email, sessionToken, name: name };
};

export const signOutUserService = async (headers: string[]): Promise<void> => {
  logger.info('signOutUserService');

  userRepository = getUserRepository();

  const { email } = <{ email: string }>await jwt.verify(headers[0], secret);
  await userRepository.update({ email }, { sessionToken: null });
};

const getUserRepository = (): Repository<User> => {
  if (!userRepository) {
    userRepository = getConnection().getRepository('User');
  }
  return userRepository;
};
