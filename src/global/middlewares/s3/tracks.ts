import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import { rm } from '../../constants';
import multerModules from '../../modules/file/multer';
import { ImageFileTooLarge } from '../error/errorInstance';

//* 게시글 - 이미지&오디오 파일 S3 업로드
const uploadS3TracksFile = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = multerModules.tracksSoundAndImage(config.tracksBucketName);
        return result(req, res, (err) => {
            if (err) {
                if (err.message === 'File too large') return next(new ImageFileTooLarge(rm.IMAGE_FILE_TOO_LARGE));
                else throw err;
            } else { next(); }
        });
    } catch (error) {
        return next(error);
    }
};

export default uploadS3TracksFile;