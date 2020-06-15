import express from 'express';
import { registerUser, signInUser, signOutUser } from './user.controller';
const router = express.Router();

// user routes
router.post('/register', registerUser);
router.post('/sign-in', signInUser);
router.get('/sign-out', signOutUser);

export default router;
