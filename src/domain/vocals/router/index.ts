import { Router } from 'express';
import vocalRouter from './VocalRouter';

const router: Router = Router();

router.use('/filter', vocalRouter);

export default router;