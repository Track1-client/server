import { Router } from "express";
import { authMulterJWT, s3UploadeMiddleware } from '../../../global/middlewares';
import ProducerController from '../../mypage/controller/ProducerController';

const router: Router = Router();

router.post('/', 
            authMulterJWT, 
            s3UploadeMiddleware.uploadS3PortfolioFile,
            ProducerController.createProducerPortfolio);

            
export default router;