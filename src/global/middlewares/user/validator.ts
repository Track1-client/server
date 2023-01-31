import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { InvalidValidationFormResult } from '../error/errorInstance/user';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req).array();
        
        if(Object.keys(errors).length !== 0 ) {
            const messages = errors.map(e => '[' + String(e.param) + ']: ' + String(e.msg));
            throw new InvalidValidationFormResult(messages);
        }
        next();
    } catch(error){
        return next(error);
    }
};