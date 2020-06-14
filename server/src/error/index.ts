import { Request, Response } from 'express';
import logger from '../logger';

export const handleError = (err, req: Request, res: Response, _): void => {
  logger.error(err);
  if (process.env.NODE_ENV === 'production') {
    err.stack = null;
  }
  res
    .status(500)
    .send({ code: err.code || 500, message: err.message || 'something broke' });
  // .json(err);
};
