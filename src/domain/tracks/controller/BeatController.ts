import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import getLocation from '../../../global/modules/file/multer/key';
import { BeatCreateDTO } from '../interfaces';
import { BeatService } from '../service';

const createBeat = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const myfiles = JSON.parse(JSON.stringify(req.files));
        const fileData = getLocation.getTrackFileKey(myfiles); //! audio, image file into string location 
        
        const beatDTO: BeatCreateDTO = req.body;
        const { tableName, userId } = req.headers;
        
        const result = await BeatService.createBeat(beatDTO, String(tableName), Number(userId), fileData);
        return res.status(sc.OK).send(success(sc.OK, rm.UPLOAD_TRACK_FILE_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const updateBeat = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const myfiles = JSON.parse(JSON.stringify(req.files));
        const fileData = getLocation.updateTrackFileKey(myfiles); //! audio, image file into string location 
        
        const beatDTO: BeatCreateDTO = req.body;
        const { beatId } = req.params;
        const { tableName, userId } = req.headers;

        const result = await BeatService.updateBeat(beatDTO, Number(beatId), String(tableName), Number(userId), fileData);
        return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_TRACK_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const deleteBeat = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const { beatId } = req.params;
        
        const result = await BeatService.deleteBeatById(Number(userId), Number(beatId));
        return res.status(sc.OK).send(success(sc.OK, rm.DELETE_TRACK_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const BeatController = {
    createBeat,
    updateBeat,
    deleteBeat,
};

export default BeatController;