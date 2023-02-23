import { Router } from 'express';
import mypageRouter from './MypageRouter';
import producerRouter from './ProducerRouter';
import vocalRouter from './VocalRouter';

const router: Router = Router();

router.use('/', mypageRouter);
router.use('/producer', producerRouter);
router.use('/vocal', vocalRouter);

export default router;