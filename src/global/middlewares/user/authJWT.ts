import { AccessTokenExpired } from './../error/errorInstance/user/token/AccessTokenExpired';
import { AccessTokenDoesNotExists } from './../error/errorInstance/user/token/AccessTokenNonExists';
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { rm, sc } from "../../constants";
import { fail } from "../../constants/response";
import tokenType from "../../constants/tokenType";
import jwtUtils from '../../modules/jwtHandler';
import { AccessTokenInvalid } from '../error/errorInstance/user';

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ").reverse()[0];
    if (!token) throw new AccessTokenDoesNotExists(rm.EMPTY_ACCESS_TOKEN);

    try {
        const decoded = jwtUtils.accessVerify(token);

        //? 토큰 에러 분기 처리
        if (decoded.message === tokenType.ACCESS_TOKEN_EXPIRED) throw new AccessTokenExpired(rm.EXPIRED_ACCESS_TOKEN);
        if (decoded.message === tokenType.ACCESS_TOKEN_INVALID) throw new AccessTokenInvalid(rm.INVALID_ACCESS_TOKEN);
        
        const tableName: string = (decoded as JwtPayload).tableName; 
        const userId: number = (decoded as JwtPayload).userId;
        if (!userId || !tableName ) throw new AccessTokenInvalid(rm.INVALID_ACCESS_TOKEN);

        //? 얻어낸 userId 를 Request Body 내 userId 필드에 담고, 다음 미들웨어로 넘김( next() )
        req.body.tableName = tableName;
        req.body.userId = userId;

        next();
    } catch (error) {
        console.log(error);
        res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
};




