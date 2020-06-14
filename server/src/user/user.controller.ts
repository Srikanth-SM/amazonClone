import { Request, Response } from 'express';
import logger from '../logger';
import { registerUserService, signInUserService } from './user.service';

export const registerUser = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  next: any
): Promise<Response> => {
  try {
    logger.info('registerUser');
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
      throw Error('name or password or email missing');
    }
    const user = await registerUserService({ name, password, email });
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

export const signInUser = async (
  req: Request,
  res: Response,
  next: any
): Promise<Response> => {
  try {
    logger.info('signInUser');
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error('email or password is required in request body');
    }
    const data = await signInUserService({ email, password });
    return res.send(data);
  } catch (err) {
    return next(err);
  }
};
