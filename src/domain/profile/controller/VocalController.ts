import { Request, Response, NextFunction } from 'express';

const createVocalPortfolio = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        return next(error);
    }
};

const VocalController = {
    createVocalPortfolio,
};

export default VocalController;