import { Request, Response, NextFunction } from 'express';
import TokenService from '../service/TokenService';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';

const refresh = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(" ").reverse()[0];
        const refreshToken = req.headers.refresh;

        await TokenService.isTokenExists(accessToken as string, refreshToken as string);
        const data = await TokenService.isRefreshValid(accessToken as string, refreshToken as string);

        return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_TOKEN_SUCCESS, data));
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