import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';

const createBeat = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        return next(error);
    }
};

const TrackController = {
    createBeat,
};

export default TrackController;