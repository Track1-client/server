import { Request, Response, NextFunction } from 'express';

const updateVocalProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        return next(error);
    }
};

const VocalController = {
    updateVocalProfile,
};

export default VocalController;