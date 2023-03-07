import { Router } from 'express';
import { body } from 'express-validator';
import { validatorErrorCallback } from '../../../global';
import { authJWT, s3UploadeMiddleware } from '../../../global/middlewares';
import { UserController } from '../controller';


const router: Router = Router();


const expressValidatorArray = [   

    body("ID")
        .trim()
        .notEmpty().withMessage("ID 비어있음")
        .isEmail().withMessage("Email 형식 아님"), 
    body("PW")
        .trim()
        .notEmpty().withMessage("PW 비어있음")
        .isLength({ min: 10 }).withMessage("비밀번호는 최소 10자리")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/).withMessage("정규식 만족 안함"),
    body("name")
        .trim()
        .isLength({ min: 1, max: 16 }).withMessage("1~16자리 만족 안함")
        .notEmpty().withMessage("name 비어있음"),
    validatorErrorCallback

];


//! producer 회원가입 
router.post(
    '/producer',
    s3UploadeMiddleware.uploadS3ProfileImageFile('producer'),
    expressValidatorArray, 
    UserController.createProducer
);


//! vocal 회원가입 
router.post(
    '/vocal',
    s3UploadeMiddleware.uploadS3ProfileImageFile('vocal'),
    expressValidatorArray, 
    UserController.createVocal 
);


//! 유저 회원가입 후 프로필 업데이트
router.patch(
    '/profile',
    authJWT,
    UserController.updateProfile
);


export default router;