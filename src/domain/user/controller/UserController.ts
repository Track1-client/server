import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import jwtUtils from '../../../global/modules/jwtHandler';
import redisClient from '../../../global/config/redisClient';
import { SignInDTO, SignInResultDTO } from '../interfaces';
import UserService from '../service/UserService';
import TokenService from '../service/TokenService';

const signIn = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userLogInDTO: SignInDTO = req.body;
        const data = await UserService.userLogin(userLogInDTO) as SignInResultDTO;

        const accessToken = jwtUtils.signAccess(data.tableName, data.userId);
        let refreshToken: string;

        //? 다중로그인 처리 -> refresh token이 valid한 경우 refresh token은 다시 재발급받지 않음
        const isRefreshToken = await TokenService.isRefreshTokenValid(data.tableName, data.userId);
        if (!isRefreshToken) {              //~ 재발급 필요 
            refreshToken = jwtUtils.signRefresh(data.tableName, data.userId);
            await redisClient.set(data.redisKey, refreshToken);  //! Redis에 refresh token 저장 
        } 
        else refreshToken = isRefreshToken;  //~ 원래 존재하는 refresh token 반환 

        const result = {
            tableName: data.tableName,
            id: data.userId,
            accessToken,
            refreshToken,
        };
    
        return res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};



const UserController = {
    signIn,
};

export default UserController;