import { Router, Response, NextFunction } from "express";
import { body } from 'express-validator';
import { validatorErrorCallback } from '../../../global';
import { s3UploadeMiddleware } from '../../../global/middlewares';
import { UserController } from '../controller';

const router: Router = Router();


//! Player 회원가입 
router.post(
    '/join/producer', 
    s3UploadeMiddleware.uploadS3ProfileImageFile('producer'),
    [
        body("ID").notEmpty(), 
        body("PW")
            .notEmpty()
            .isLength({ min: 6 }), 
        body("name").notEmpty(),
        body("contact").notEmpty(), 
        body("category").notEmpty(), 
        body("keyword").notEmpty(),
        validatorErrorCallback
    ],
    UserController.createProducer
);



//! NonPlayer 회원가입 




export default router;