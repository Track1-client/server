import { Router } from "express";
import { body } from 'express-validator';
import { authJWT, validatorErrorCallback } from '../../../global/middlewares';
import { MailController, TokenController, UserController } from '../controller';

const router: Router = Router();

const expressValidatorArray = [
    body("tableName").notEmpty(),
    body("userEmail")
        .trim()
        .isEmail(),
    validatorErrorCallback
];

//! 토큰 재발급
router.get('/refresh', TokenController.refresh);

//? 닉네임 중복 검사
router.get('/check-name', UserController.checkName);

//* 회원가입 인증코드 메일 전송 
router.post(
    '/auth-mail',
    expressValidatorArray,
    MailController.postAuthMail
);

//* 회원가입 인증코드 메일 재전송 
router.patch(
    '/auth-mail-repost',
    expressValidatorArray,
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

//& 비밀번호 찾기 메일 전송 
router.post(
    '/newpassword-mail',
    expressValidatorArray,
    MailController.getNewPasswordMail
);

//& 비밀번호 변경
router.patch(
    '/newpassword',
    [
        body("tableName").notEmpty(),
        body("userEmail").isEmail().notEmpty(),
        body("password")
        .trim()
        .notEmpty().withMessage("PW 비어있음")
        .isLength({ min: 10 }).withMessage("비밀번호는 최소 10자리")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/).withMessage("정규식 만족 안함"),
        validatorErrorCallback
    ],
    UserController.updatePassword
);

export default router;