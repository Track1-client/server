import jwt from "jsonwebtoken";
import redisClient from "redis";
import { promisify } from "util";
import config from '../config';
import tokenType from '../constants/tokenType';


//& Access Token 발급
const signAccess = (tableName: string, userId: number) => {
//const sign = (user: User) => {
    const payload = {
        tableName,
        userId,
    };

    const accessToken = jwt.sign(payload, config.jwtSecret, 
        { 
            algorithm: config.jwtAlgo,
            expiresIn: config.jwtAccessExp, 
        }
    );  

    return accessToken;
};


//& Refresh Token 발급
const signRefresh = (tableName: string, userId: number) => {
    const payload = {
        tableName,
        userId,
    };

    const refreshToken = jwt.sign(payload, config.jwtSecret, 
        { 
            algorithm: config.jwtAlgo,
            expiresIn: config.jwtRefreshExp, 
        }
    );  

    return refreshToken;
};


//& Access Token 유효성 검사
const accessVerify = (token: string) => {
    let decoded: string | jwt.JwtPayload;

    try {
        decoded = jwt.verify(token, config.jwtSecret);
        return decoded;
    } catch (error: any) {
        if (error.message === "jwt expired") { return tokenType.ACCESS_TOKEN_EXPIRED }
        else if (error.message === "invalid token") { return tokenType.ACCESS_TOKEN_INVALID } 
        else { return tokenType.ACCESS_TOKEN_INVALID }
    }
};


//& Refresh Token 유효성 검사 
const refreshVerify = async(token: string, userId: number, tableName: string) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);  //! TO_DO 

    try {
        const data = await getAsync(tableName, userId);
        
        if (token === data) {
            try {
                jwt.verify(token, config.jwtSecret);    //* refresh token 유효성 검사
                return true;  //~ refresh token 만료 안됨 
            } catch (error: any) {
                return tokenType.REFRESH_TOKEN_EXPIRED  //~ refresh token 만료된 경우 
            }
        } else {
            return tokenType.REFRESH_TOKEN_INVALID             //* 유효하지 않은 refresh token 
        }
    } catch (error: any) {
        return tokenType.GLOBAL_TOKEN_INVALID
    }
};


const jwtUtils = {
    signAccess,
    signRefresh,
    accessVerify,
    refreshVerify,
}

export default jwtUtils;