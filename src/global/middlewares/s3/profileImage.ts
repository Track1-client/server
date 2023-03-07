import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import { rm } from '../../constants';
import fileFilter from '../../modules/file/fileFilter';
import multerModules from '../../modules/file/multer';
import { ImageFileTooLarge } from '../error/errorInstance';


function uploadS3ProfileImageFile(tableName: string) {

    return function (req: Request, res: Response, next: NextFunction) {

        try {

            const result = (tableName == 'producer') ? 
                multerModules.profileImageMulter(config.profileImageBucketName, 'producerProfileImage/', fileFilter.imageFileFilter) :
                multerModules.profileImageMulter(config.profileImageBucketName, 'vocalProfileImage/', fileFilter.imageFileFilter);
            
            return result(req, res, (err) => {

                if (err) {
                    if (err.message === 'File too large') return next(new ImageFileTooLarge(rm.IMAGE_FILE_TOO_LARGE));
                    else throw next(err);
                } 
                else { next(); }

            });

        } catch (error) {

            return next(error);

        }

    }

};


export default uploadS3ProfileImageFile;