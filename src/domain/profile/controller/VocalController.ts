import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import getLocation from '../../../global/modules/file/multer/key';
import { VocalProfileGetDTO, VocalProfileUpdateDTO } from '../interfaces';
import VocalService from '../service/VocalService';


const getVocalProfile = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const { vocalId } = req.params;
        const { page, limit } = req.query;
        const profileDTO: VocalProfileGetDTO = req.body;

        const result = await VocalService.getVocalProfile(profileDTO, Number(vocalId), Number(page), Number(limit));

        return res.status(sc.OK).send(success(sc.OK, rm.GET_VOCAL_PROFILE_SUCCESS, result));

    } catch (error) {

        return next(error);

    }

};


const updateVocalProfile = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const imageFileKey: Express.MulterS3.File = req.file as Express.MulterS3.File;
        const fileData = getLocation.getProfileImageFileKey(imageFileKey); //! image file into string location 
        
        const { tableName, userId } = req.headers;
        const profileDTO: VocalProfileUpdateDTO = req.body;

        const result = await VocalService.updateVocalProfile(profileDTO, String(tableName), Number(userId), fileData);

        return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_VOCAL_PROFILE_SUCCESS, result));

    } catch (error) {

        return next(error);

    }

};


const VocalController = {

    getVocalProfile,
    updateVocalProfile

};


export default VocalController;