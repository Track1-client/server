import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import getLocation from '../../../global/modules/file/multer/key';
import { ProducerProfileGetDTO, ProducerProfileUpdateDTO } from '../interfaces';
import ProducerService from '../service/ProducerService';

const getProducerProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { producerId } = req.params;
        const { page, limit } = req.query;
        const profileDTO: ProducerProfileGetDTO = req.body;

        const result = await ProducerService.getProducerProfile(profileDTO, Number(producerId), Number(page), Number(limit));

        return res.status(sc.OK).send(success(sc.OK, rm.GET_PRODUCER_PROFILE_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};
const updateProducerProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const imageFileKey: Express.MulterS3.File = req.file as Express.MulterS3.File;
        const fileData = getLocation.getProfileImageFileKey(imageFileKey); //! image file into string location 
        
        const { tableName, userId } = req.headers;
        const profileDTO: ProducerProfileUpdateDTO = req.body;

        const result = await ProducerService.updateProducerProfile(profileDTO, String(tableName), Number(userId), fileData);

        return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_PRODUCER_PROFILE_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const ProducerController = {
    getProducerProfile,
    updateProducerProfile,
};

export default ProducerController;