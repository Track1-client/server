import { Router } from "express";
import { body } from 'express-validator';
import { ValidatorErrorCallback } from '../../../global';
import { authJWT } from '../../../global/middlewares';
import { TokenController, UserController } from '../controller';

const router: Router = Router();


//! 로그인 
router.post(
    "/login",
    [
        body("ID").notEmpty(),
        body("PW").notEmpty(),
        body("PW").isLength({ min: 6 }),
        ValidatorErrorCallback
    ],
    UserController.signIn
);


//! 로그아웃
router.get('/logout', authJWT, TokenController.deleteRefreshToken);


export default router;