import { Router } from "express";
import { body } from 'express-validator';
import { ValidatorErrorCallback } from '../../../global';
import { authJWT } from '../../../global/middlewares';
import { TokenController, UserController } from '../controller';

const router: Router = Router();


//! Player 회원가입 




//! NonPlayer 회원가입 




export default router;