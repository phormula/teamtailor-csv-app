import { Request, Response, Router } from 'express';
import { join } from 'path';
import downloadRouter from './download';

const router = Router();
router.use('/api', downloadRouter);

router.all('*', (_: Request, res: Response) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

export default router;
