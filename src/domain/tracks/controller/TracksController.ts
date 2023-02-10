import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';

const createBeat = async(req: Request, res: Response, next: NextFunction) => {
    try {

        
        return res.status(sc.OK).send(success(sc.OK, rm.UPLOAD_TRACK_FILE_SUCCESS));
    } catch (error) {
        return next(error);
    }
};

const TrackController = {
    createBeat,
};

export default TrackController;