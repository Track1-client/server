import { Router, Response, NextFunction } from "express";
import { body } from 'express-validator';
import { validatorErrorCallback } from '../../../global';
import { s3UploadeMiddleware } from '../../../global/middlewares';
import { UserController } from '../controller';

const router: Router = Router();


//! producer 회원가입 
router.post(
    '/producer', 
    s3UploadeMiddleware.uploadS3ProfileImageFile('producer'),
    [
        body("ID")
            .trim()
            .isEmail()
            .notEmpty(), 
        body("PW")
            .trim()
            .notEmpty()
            .isLength({ min: 10 })
            .matches(/^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]/), 
        body("name").notEmpty(),
        body("contact").notEmpty(), 
        body("category").notEmpty(), 
        body("keyword").notEmpty(),
        validatorErrorCallback
    ],
    UserController.createProducer
);



//! vocal 회원가입 




export default router;