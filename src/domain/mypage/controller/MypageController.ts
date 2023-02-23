import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import { GetMyInformationFail } from '../../../global/middlewares/error/errorInstance';
import { InformationGetDTO } from '../interfaces';
import MypageService from '../service/MypageService';

const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const infoDTO: InformationGetDTO = req.body;

        const result = await MypageService.getUserInfo(infoDTO, Number(page), Number(limit));
        if (!result) throw new GetMyInformationFail(rm.GET_USER_INFORMATION_FAIL);
        return res.status(sc.OK).send(success(sc.OK, rm.GET_USER_INFORMATION_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const MypageController = {
    getUserInfo,
};

export default MypageController;