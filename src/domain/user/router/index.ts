import { Router } from 'express';
import userElseRouter from './UserElseRouter';
import userSigninRouter from './UserSigninRouter';
import userSignupRouter from './UserSignupRouter';


const router: Router = Router();


router.use('/join', userSignupRouter);
router.use('/etc', userElseRouter);
router.use('/auth', userSigninRouter);


export default router;