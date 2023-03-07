import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import multerModules from '../../modules/file/multer';


const uploadS3VocalPortfolioFile = (req: Request, res: Response, next: NextFunction) => {

    try {

        const result = multerModules.portfolioAudioAndImage(config.vocalPortfolioBucketName);
        
        return result(req, res, (error) => {

            if (error) { throw next(error); } 
            else { next(); }
            
        });

    } catch (error) {

        return next(error);

    }

};


export default uploadS3VocalPortfolioFile;