import bodyParser from 'body-parser';
import { Router } from 'express';
import { body } from 'express-validator';
import { validatorErrorCallback } from '../../../global';
import { s3UploadeMiddleware } from '../../../global/middlewares';
import { UserController } from '../controller';

const router: Router = Router();
var parser = bodyParser.urlencoded({extended:false});

//! producer 회원가입 
router.post(
    '/producer',
    s3UploadeMiddleware.uploadS3ProfileImageFile('producer'),
    [   
        body("ID")
            .trim()
            .notEmpty().withMessage("ID 비어있음")
            .isEmail().withMessage("Email 형식 아님"), 
        body("PW")
            .trim()
            .notEmpty().withMessage("PW 비어있음")
            .isLength({ min: 10 }).withMessage("비밀번호는 최소 10자리")
            .matches(/^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]/).withMessage("정규식 만족 안함"), 
        body("name")
            .trim()
            .isLength({ min: 1, max: 16 }).withMessage("1~16자리 만족 안함")
            .notEmpty().withMessage("name 비어있음"),
        validatorErrorCallback
    ], 
    UserController.createProducer
);


//! vocal 회원가입 
router.post(
    '/vocal',
    UserController.createVocal 
);



export default router;