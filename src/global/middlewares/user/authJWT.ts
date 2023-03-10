import { AccessTokenExpired, AccessTokenDoesNotExists, AccessTokenInvalid } from '../error/errorInstance/user';
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { rm } from "../../constants";
import tokenType from "../../constants/tokenType";
import jwtUtils from '../../modules/jwtHandler';
import LOGGER from '../../../../config/winstonLogger';


export default async (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req.headers.authorization?.split(" ").reverse()[0];
        LOGGER.error(`${token}`);
        if (!token) throw new AccessTokenDoesNotExists(rm.EMPTY_ACCESS_TOKEN);

        const decoded = jwtUtils.accessVerify(token);
        

        //? 토큰 에러 분기 처리
        if (decoded.message === tokenType.ACCESS_TOKEN_EXPIRED) throw new AccessTokenExpired(rm.EXPIRED_ACCESS_TOKEN);
        if (decoded.message === tokenType.ACCESS_TOKEN_INVALID) throw new AccessTokenInvalid(rm.INVALID_ACCESS_TOKEN);
        

        const tableName: string = (decoded.decoded as JwtPayload).tableName; 
        const userId: string = (decoded.decoded as JwtPayload).userId;

        if (!userId || !tableName ) throw new AccessTokenInvalid(rm.INVALID_ACCESS_TOKEN);


        //? 얻어낸 userId 를 Request Headers 내 userId 필드에 담고, 다음 미들웨어로 넘김( next() )
        req.body.tableName = tableName;
        req.body.userId = userId;

        
        next();

    } catch (error) {

        return next(error);

    }

};




