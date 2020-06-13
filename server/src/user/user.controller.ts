import { Request, Response, Application } from 'express';
import logger from '../logger';
import { registerUserService } from './user.service';

export const registerUser = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  next: any
): Promise<Response> => {
  try {
    logger.info('registerUser');
    const { name, password, email } = req.body;
    const user = await registerUserService({ name, password, email });
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};
