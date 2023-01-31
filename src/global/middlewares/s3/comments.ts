import { NextFunction } from 'express';
import multer from "multer";
import multerS3 from "multer-s3";
import config from '../../config';
import s3 from '../../../infra/aws/s3Config';

//? 파일 타입 검사 
const fileFilter = (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
    
};

const commentMulter = multer({

}).single('audioFile');


const uploadS3CommentFile = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        return next(error);
    }
};

export default uploadS3CommentFile;
