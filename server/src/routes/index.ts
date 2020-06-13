import express, { Request, Response } from 'express';
import user from '../user';
import logger from '../logger';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', user.userRoutes);
export default app;
