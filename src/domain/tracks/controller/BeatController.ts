import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import convertCategory from '../../../global/modules/convertCategory';
import getLocation from '../../../global/modules/file/multer/key';
import { BeatClosedUpdateDTO, BeatCreateDTO } from '../interfaces';
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

const getBeatList = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit, categ } = req.query;

        const result = await BeatService.getBeatList(Number(page), Number(limit), convertCategory(categ));
        return res.status(sc.OK).send(success(sc.OK, rm.GET_TRACK_LIST_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const getBeatFile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { beatId } = req.params;

        const result = await BeatService.getBeatFile(Number(beatId));
        return res.status(sc.OK).send(success(sc.OK, rm.GET_TRACK_FILE_SUCCESS, result));
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

const updateBeatClosed = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { beatId } =req.params;
        const closedDTO: BeatClosedUpdateDTO = req.body;

        const result = await BeatService.updateBeatClosed(Number(beatId), closedDTO);
        return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_TRACK_CLOSED_SUCCESS, result));
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
    getBeatList,
    getBeatFile,
    updateBeat,
    updateBeatClosed,
    deleteBeat,
};

export default BeatController;