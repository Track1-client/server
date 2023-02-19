import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import getLocation from '../../../global/modules/file/multer/key';
import { PortfolioCreateDTO, PortfolioDeleteDTO } from '../interfaces';
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

const deleteVocalPortfolio = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const portfolioDTO: PortfolioDeleteDTO = req.body;
        const { vocalPortfolioId } = req.params;

        const result = await VocalService.deleteVocalPortfolio(portfolioDTO, Number(vocalPortfolioId));

        return res.status(sc.OK).send(success(sc.CREATED, rm.DELETE_PRODUCER_PORTFOLIO_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const VocalController = {
    createVocalPortfolio,
    deleteVocalPortfolio,
};

export default VocalController;