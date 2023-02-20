import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import getLocation from '../../../global/modules/file/multer/key';
import { VocalProfileUpdateDTO } from '../interfaces';
import VocalService from '../service/VocalService';

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
    updateVocalProfile,
};

export default VocalController;