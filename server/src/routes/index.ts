import express, { Request, Response } from 'express';
import user from '../user';
import logger from '../logger';
import { handleError } from '../error';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', user.userRoutes);
app.use(handleError);
export default app;
