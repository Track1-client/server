import { Request, Response, NextFunction } from 'express';
import config from '../../../config';
import { rm } from '../../../constants';
import multerModules from '../../../modules/file/multer';
import { FileTooLarge } from '../../error/errorInstance';

//* 게시글 - 이미지&오디오 파일 S3 업로드
const updateS3TracksFile = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = multerModules.tracksUpdateSoundAndImage(config.tracksBucketName);
        
        // return result(req, res, (error) => {
        //     if (error) {
        //         if (error.message === 'File too large') return next(new FileTooLarge(rm.FILE_TOO_LARGE));
        //         else throw error;
        //     } else { 
        //         next(); 
        //     }
        // });
    } catch (error) {
        return next(error);
    }
};

export default updateS3TracksFile;