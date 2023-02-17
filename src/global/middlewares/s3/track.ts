import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import multerModules from '../../modules/file/multer';

//* 게시글 - 이미지&오디오 파일 S3 업로드
const uploadS3TracksFile = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = multerModules.tracksAudioAndImage(config.tracksBucketName);
        
        return result(req, res, (error) => {
            if (error) {
                throw error;
            } else { 
                next(); 
            }
        });
    } catch (error) {
        return next(error);
    }
};

export default uploadS3TracksFile;