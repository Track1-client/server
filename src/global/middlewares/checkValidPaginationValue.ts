import { InvalidPaginationParams } from './error/errorInstance';
import { NextFunction, Request, Response } from "express";
import { rm } from '../constants';


//~ 무한스크롤을 위한 페이지네이션 변수 조건 확인
export default async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { page, limit } = req.query;
    
        let numPage = Number(page);
        let numLimit = Number(limit);
        
        const pageCondition = ( numPage>=1 && Number.isInteger(numPage) );
        const limitCondition = ( numLimit>=1 && Number.isInteger(numLimit) );
    
        
        const result = ( pageCondition && limitCondition ) ? true : false;
        if(!result) throw new InvalidPaginationParams(rm.INVALID_PAGINATION_PARAMETERS);
        
        next();

    } catch (error) {

        return next(error);

    }

};