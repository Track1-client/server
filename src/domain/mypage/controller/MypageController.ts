import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import { InformationGetDTO } from '../interfaces';
import MypageService from '../service/MypageService';

const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const infoDTO: InformationGetDTO = req.body;

        const result = await MypageService.getUserInfo(infoDTO, Number(page), Number(limit));
        return res.status(sc.OK).send(success(sc.CREATED, rm.GET_USER_INFORMATION_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const MypageController = {
    getUserInfo,
};

export default MypageController;