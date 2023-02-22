import { Router } from "express";
import { authJWT, authMulterJWT, s3UploadeMiddleware } from '../../../global/middlewares';
import VocalController from '../controller/VocalController';

const router: Router = Router();

router.post('/', 
            authMulterJWT, 
            s3UploadeMiddleware.uploadS3VocalPortfolioFile,
            VocalController.createVocalPortfolio);

router.patch('/:vocalPortfolioId',
            authMulterJWT,
            s3UploadeMiddleware.uploadS3VocalPortfolioFile,
            VocalController.updateVocalPortfolio);

router.patch('/',
            authJWT,
            VocalController.updateVocalTitle);

router.delete('/:vocalPortfolioId',
                authJWT,
                VocalController.deleteVocalPortfolio);

export default router;