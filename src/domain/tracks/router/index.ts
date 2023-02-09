import { Router } from 'express';
import tracksRouter from './TracksRouter';

const router: Router = Router();

router.use('/', tracksRouter);

export default router;