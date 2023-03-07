import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import multerModules from '../../modules/file/multer';


const uploadS3CommentFile = (req: Request, res: Response, next: NextFunction) => {

    try {

        const result = multerModules.commentAudioMulter(config.commentsBucketName);

        return result(req, res, (error) => {

            if (error) { throw next(error); } 

            else { next(); }
            
        });

    } catch (error) {

        return next(error);

    }

};


export default uploadS3CommentFile;
