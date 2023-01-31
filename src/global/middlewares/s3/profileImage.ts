import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import fileFilter from '../../modules/file/fileFilter';
import multerModules from '../../modules/file/multer';

function uploadS3ProfileImageFile(tableName: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const result = (tableName == 'producer') ? 
                multerModules.profileImageMulter(config.profileImageBucketName, 'producerProfileImage/', fileFilter.imageFileFilter) :
                multerModules.profileImageMulter(config.profileImageBucketName, 'vocalProfileImage/', fileFilter.imageFileFilter);
            
            return result(req, res, next);
        } catch (error) {
            return next(error);
        }
    }
};

export default uploadS3ProfileImageFile;