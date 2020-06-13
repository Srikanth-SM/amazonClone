import { getConnection } from 'typeorm';
import logger from '../logger';
import User from './user.entity';

export const registerUserService = async (newuser: User): Promise<User> => {
  logger.info('registerUserService');
  const userRepository = getConnection().getRepository('User');
  const { name, password, email } = newuser;
  const user = new User(name, password, email);
  await userRepository.save(user);
  return user;
};
