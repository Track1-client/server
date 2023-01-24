import { Request, Response, NextFunction } from 'express';
import TokenService from '../service/TokenService';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';

const refresh = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(" ").reverse()[0];
        const refreshToken = req.headers.refresh;

        await TokenService.isTokenExists(accessToken as string, refreshToken as string);
        const data = await TokenService.isValidRefresh(accessToken as string, refreshToken as string);

        return res.status(sc.OK).send(success(sc.OK, rm.CREATE_TOKEN_SUCCESS, data));
    } catch (error) {
        return next(error);
    }
};

const TokenController = {
    refresh,
};

export default TokenController;