import { Router } from "express";
import { default as userRouter } from './user/router/index';
import { default as tracksRouter } from './tracks/router/index';
import { default as mypageRouter } from './mypage/router/index';
import vocalsRouter from './vocals/router/vocalsRouter';
import { default as profileRouter } from './profile/router/index';


const router: Router = Router();


router.use('/user', userRouter);
router.use('/tracks', tracksRouter);
router.use('/vocals', vocalsRouter);
router.use('/profile', profileRouter);
router.use('/mypage', mypageRouter);


export default router;