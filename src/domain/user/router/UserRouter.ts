import { Router, Request, Response, NextFunction } from "express";
import { body } from 'express-validator';
import { ValidatorErrorCallback } from '../../../global';
import { authJWT } from '../../../global/middlewares';
import { TokenController, UserController } from '../controller/';

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


//! 토큰 재발급
router.get('/refresh', TokenController.refresh);

//! 로그아웃
router.get('/logout', authJWT, TokenController.deleteRefreshToken);

//! 비밀번호 찾기
router.post('/newpassword', UserController.getNewPassword);


export default router;