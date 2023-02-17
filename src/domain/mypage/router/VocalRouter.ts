import { Router } from "express";
import { authMulterJWT, s3UploadeMiddleware } from '../../../global/middlewares';
import VocalController from '../controller/VocalController';

const router: Router = Router();

router.post('/', 
            authMulterJWT, 
            s3UploadeMiddleware.uploadS3PortfolioFile,
            VocalController.createVocalPortfolio);

export default router;