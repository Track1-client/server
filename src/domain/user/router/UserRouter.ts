import { Router, Request, Response, NextFunction } from "express";
import { body } from 'express-validator';
import { ValidatorErrorCallback } from '../../../global';
import UserController from '../controller/UserController';


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


export default router;