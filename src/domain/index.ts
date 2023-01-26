import { Router } from "express";
import userRouter from './user/router';
import tracksRouter from './tracks/router/tracksRouter';
import vocalsRouter from './vocals/router/vocalsRouter';
import profileRouter from './profile/router/profileRouter';
import mypageRouter from './mypage/router/mypageRouter';


const router: Router = Router();


router.use('/user', userRouter);
router.use('/tracks', tracksRouter);
router.use('/vocals', vocalsRouter);
router.use('/profile', profileRouter);
router.use('/mypage', mypageRouter);


export default router;