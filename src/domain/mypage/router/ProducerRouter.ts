import { Router } from "express";
import { authJWT, authMulterJWT, s3UploadeMiddleware } from '../../../global/middlewares';
import ProducerController from '../../mypage/controller/ProducerController';

const router: Router = Router();

router.post('/', 
            authMulterJWT, 
            s3UploadeMiddleware.uploadS3ProducerPortfolioFile,
            ProducerController.createProducerPortfolio);

router.patch('/:producerPortfolioId',
                authMulterJWT,
                s3UploadeMiddleware.uploadS3ProducerPortfolioFile,
                ProducerController.updateProducerPortfolio);

router.patch('/',
            authJWT,
            ProducerController.updateProducerTitle);

router.delete('/:producerPortfolioId',
                authJWT,
                ProducerController.deleteProducerPortfolio);
                
export default router;