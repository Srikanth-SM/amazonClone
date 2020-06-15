import { Request, Response } from 'express';
import logger from '../logger';
import {
  registerUserService,
  signInUserService,
  signOutUserService
} from './user.service';

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

export const signOutUser = async (
  req: Request,
  res: Response,
  next: any
): Promise<Response> => {
  try {
    logger.info('signOutUser');

    let headers: string | string[] =
      req.headers[process.env.sessionToken] || req.headers['test'];
    // if (headers && headers.length==) {
    //   throw Error('No session token, already signed out');
    // }
    console.log(req.headers['x-amazonclone-sessiontoken'], process.env);
    headers = <string[]>[headers];
    await signOutUserService(headers);
    res.send({ status: 'success' });
  } catch (err) {
    return next(err);
  }
};
