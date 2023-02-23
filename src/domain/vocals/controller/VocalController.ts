import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import convertCategory from '../../../global/modules/convertCategory';
import { FilteringDTO } from '../interfaces';
import { VocalService } from '../service';

const getVocalList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filterDTO: FilteringDTO = req.body;
        const { categ, isSelected, page, limit } = req.query;

        const result = await VocalService.getVocalList(convertCategory(categ), String(isSelected), Number(page), Number(limit));

        return res.status(sc.OK).send(success(sc.OK, rm.GET_VOCAL_LIST_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const VocalController = {
    getVocalList,
};

export default VocalController;