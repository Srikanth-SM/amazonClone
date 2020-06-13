import express from 'express';
import { registerUser } from './user.controller';
const router = express.Router();

router.get('/register', registerUser);

export default router;
