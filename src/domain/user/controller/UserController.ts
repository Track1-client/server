import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success, fail } from '../../../global/constants/response';
import jwtUtils from '../../../global/modules/jwtHandler';
import redisClient from '../../../global/modules/redisClient';
import { SignInDTO, SignInResultDTO } from '../interfaces';
import UserService from '../service/UserService';

const signIn = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userLogInDTO: SignInDTO = req.body;
        const data = await UserService.userLogin(userLogInDTO) as SignInResultDTO;

        const accessToken = jwtUtils.signAccess(data.tableName, data.userId);
        const refreshToken = jwtUtils.signRefresh(data.tableName, data.userId);

        redisClient.set(data.redisKey, refreshToken);  //! Redis에 refresh token 저장 
    
        const result = {
            tableName: data.tableName,
            id: data.userId,
            accessToken,
            refreshToken,
        };
    
        return res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
    } catch (error) {
        return next(error);
    };
};


const UserController = {
    signIn,
};

export default UserController;