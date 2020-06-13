import 'reflect-metadata';
import { createConnection } from 'typeorm';
import logger from './logger';
import app from './routes';

createConnection()
  .then(() => {
    app.listen(3000, () => {
      logger.info('Running on port 3000');
    });
  })
  .catch((error) => {
    logger.error('error', error);
  });
