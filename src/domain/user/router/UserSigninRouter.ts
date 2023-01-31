import { Router } from "express";
import { body } from 'express-validator';
import { validatorErrorCallback } from '../../../global';
import { authJWT } from '../../../global/middlewares';
import { TokenController, UserController } from '../controller';

const router: Router = Router();


//! 로그인 
router.post(
    '/login',
    [
        body("ID").notEmpty(),
        body("PW")
            .notEmpty()
            .isLength({ min: 6 }),
        validatorErrorCallback
    ],
    UserController.signIn
);


//! 로그아웃
router.get('/logout', authJWT, TokenController.deleteRefreshToken);


export default router;