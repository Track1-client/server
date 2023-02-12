import { Router } from 'express';
import beatRouter from './BeatRouter';

const router: Router = Router();

router.use('/', beatRouter);

export default router;