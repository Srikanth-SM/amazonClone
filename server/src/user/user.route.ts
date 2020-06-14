import express from 'express';
import { registerUser, signInUser } from './user.controller';
const router = express.Router();

// user routes
router.post('/register', registerUser);
router.post('/sign-in', signInUser);

export default router;
