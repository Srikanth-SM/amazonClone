import express, { Response, Request } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response, next) => {
  res.send('test');
  next();
});

export default router;
