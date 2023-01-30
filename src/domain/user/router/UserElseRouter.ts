import { Router } from "express";
import { body } from 'express-validator';
import { validatorErrorCallback } from '../../../global/middlewares';
import { MailController, TokenController, UserController } from '../controller';

const router: Router = Router();


//! 토큰 재발급
router.get('/refresh', TokenController.refresh);

//? 닉네임 중복 검사
router.get('/check-name', UserController.checkName);

//* 회원가입 인증코드 메일 전송 
router.post(
    '/auth-mail',
    [
        body("tableName").notEmpty(),
        body("userEmail")
            .trim()
            .isEmail(),
        validatorErrorCallback
    ],
    MailController.postAuthMail
);

//* 회원가입 인증코드 메일 재전송 
router.patch(
    '/auth-mail-repost',
    [
        body("tableName").notEmpty(),
        body("userEmail")
            .trim()
            .isEmail(),
        validatorErrorCallback
    ],
    MailController.repostAuthMail
);

//* 인증코드 확인 
router.post(
    '/verify',
    [
        body("tableName").notEmpty(),
        body("userEmail").isEmail(),
        body("verificationCode").notEmpty(),
        validatorErrorCallback
    ],
    MailController.verifyCode
);

//& 비밀번호 찾기 메일 
router.post(
    '/newpassword-mail',
    [
        body("tableName").notEmpty(),
        body("userEmail").isEmail(),
        validatorErrorCallback
    ], 
    MailController.getNewPasswordMail
);

export default router;