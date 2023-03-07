import { Router } from 'express';
import beatRouter from './BeatRouter';
import commentRouter from './CommentRouter';


const router: Router = Router();


router.use('/', beatRouter);
router.use('/comments', commentRouter);


export default router;