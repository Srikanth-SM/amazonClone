import express from 'express';
import user from '../user';
const app = express();

app.use('/user', user.userRoutes);
export default app;
