import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import getLocation from '../../../global/modules/file/multer/key';
import { PortfolioCreateDTO } from '../interfaces';
import VocalService from '../service/VocalService';

const createVocalPortfolio = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const myfiles = JSON.parse(JSON.stringify(req.files));
        const fileData = getLocation.getVocalPortfolioFileKey(myfiles); //! audio, image file into string location 
        
        const portfolioDTO: PortfolioCreateDTO = req.body;
        const { tableName, userId } = req.headers;
        
        const result = await VocalService.createVocalPortfolio(portfolioDTO, String(tableName), Number(userId), fileData);

        return res.status(sc.OK).send(success(sc.CREATED, rm.UPLOAD_VOCAL_PORTFOLIO_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const VocalController = {
    createVocalPortfolio,
};

export default VocalController;