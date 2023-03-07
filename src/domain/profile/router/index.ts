import { Router } from 'express';
import producerRouter from './ProducerRouter';
import vocalRouter from './VocalRouter';


const router: Router = Router();


router.use('/producer', producerRouter);
router.use('/vocal', vocalRouter);


export default router;