import { success } from './../../../../../backend/src/constants/response';
import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import getLocation from '../../../global/modules/file/multer/key';
import { PortfolioCreateDTO, PortfolioDeleteDTO } from '../interfaces';
import ProducerService from '../service/ProducerService';

const createProducerPortfolio = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const myfiles = JSON.parse(JSON.stringify(req.files));
        const fileData = getLocation.getProducerPortfolioFileKey(myfiles); //! audio, image file into string location 
        
        const portfolioDTO: PortfolioCreateDTO = req.body;
        const { tableName, userId } = req.headers;
        
        const result = await ProducerService.createProducerPortfolio(portfolioDTO, String(tableName), Number(userId), fileData);

        return res.status(sc.OK).send(success(sc.CREATED, rm.UPLOAD_PRODUCER_PORTFOLIO_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const deleteProducerPortfolio = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const portfolioDTO: PortfolioDeleteDTO = req.body;
        const { producerPortfolioId } = req.params;

        const result = await ProducerService.deleteProducerPortfolio(portfolioDTO, Number(producerPortfolioId));

        return res.status(sc.OK).send(success(sc.CREATED, rm.DELETE_PRODUCER_PORTFOLIO_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const ProducerController = {
    createProducerPortfolio,
    deleteProducerPortfolio,
};

export default ProducerController;