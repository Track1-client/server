import { Request, Response, NextFunction } from 'express';

const createProducerPortfolio = async(req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        return next(error);
    }
};

const ProducerController = {
    createProducerPortfolio,
};

export default ProducerController;