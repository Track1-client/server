import { Request, Response, NextFunction } from 'express';
import TokenService from '../service/TokenService';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';

const refresh = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(" ").reverse()[0];
        
        const { refreshToken } = req.cookies;
        console.log(refreshToken);
        await TokenService.isTokenExists(accessToken as string, refreshToken as string);
        const data = await TokenService.isRefreshValid(accessToken as string, refreshToken as string);

        return res
                .cookie('refreshToken', data.refreshToken, {
                    //httpOnly: true,
                    //secure: true,
                    //sameSite: 'none',
                    //domain: '.track1.site',
                    domain: 'localhost',
                    maxAge: 60 * 24 * 60 * 60 * 1000 , // 유효기간 60일 
                })
                .status(sc.CREATED)
                .send(success(sc.CREATED, rm.CREATE_TOKEN_SUCCESS, data.accessToken));
    } catch (error) {
        return next(error);
    }
};

const deleteRefreshToken = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { tableName, userId } = req.body;
        await TokenService.deleteRefreshToken(tableName, userId);

        return res.status(sc.OK).send(success(sc.OK, rm.SIGNOUT_SUCCESS));
    } catch(error) {
        return next(error);
    }
};

const TokenController = {
    refresh,
    deleteRefreshToken,
};

export default TokenController;