import { Router } from "express";
import { body } from 'express-validator';
import { validatorErrorCallback } from '../../../global/middlewares';
import { MailController, TokenController } from '../controller';

const router: Router = Router();


//! 토큰 재발급
router.get('/refresh', TokenController.refresh);

//! 회원가입 인증코드 메일 전송 
router.post(
    '/auth-mail',
    [
        body("tableName").notEmpty(),
        body("userEmail").isEmail(),
        validatorErrorCallback
    ],
    MailController.postAuthMail
);

//! 회원가입 인증코드 메일 재전송 
router.patch(
    '/auth-mail',
    [
        body("tableName").notEmpty(),
        body("userEmail").isEmail(),
        validatorErrorCallback
    ],
    MailController.repostAuthMail
);

//! 인증코드 확인 
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

//! 비밀번호 찾기 메일 
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