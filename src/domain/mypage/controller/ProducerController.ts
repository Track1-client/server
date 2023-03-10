import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import getLocation from '../../../global/modules/file/multer/key';
import { PortfolioCreateDTO, PortfolioDeleteDTO, PortfolioUpdateDTO, TitleUpdateDTO } from '../interfaces';
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


const updateProducerPortfolio = async(req: Request, res: Response, next: NextFunction) => {
    
    try {

        const myfiles = JSON.parse(JSON.stringify(req.files));
        const fileData = getLocation.updateProducerPortfolioFileKey(myfiles); //! audio, image file into string location 
        
        const portfolioDTO: PortfolioUpdateDTO = req.body;
        const { tableName, userId } = req.headers;
        const { producerPortfolioId } = req.params;

        const result = await ProducerService.updateProducerPortfolio(Number(producerPortfolioId), String(tableName), Number(userId), portfolioDTO, fileData);
        
        return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_PRODUCER_PORTFOLIO_SUCCESS, result));

    } catch (error) {

        return next(error)

    }

};


const updateProducerTitle = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const titleDTO: TitleUpdateDTO = req.body;
        const { oldId, newId } = req.query;

        const result = await ProducerService.updateProducerTitle(titleDTO, Number(oldId), Number(newId));

        return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_PRODUCER_TITLE_SUCCESS, result));

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
    updateProducerPortfolio,
    updateProducerTitle,
    deleteProducerPortfolio,
    
};


export default ProducerController;