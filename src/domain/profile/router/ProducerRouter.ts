import { Router } from "express";
import { authJWT, authMulterJWT, checkPaginationValue, s3UploadeMiddleware } from '../../../global/middlewares';
import ProducerController from '../controller/ProducerController';

const router: Router = Router();

router.get('/:producerId',
            checkPaginationValue,
            authJWT,
            ProducerController.getProducerProfile);

router.get('/:producerId/beats',
            checkPaginationValue,
            authJWT,
            ProducerController.getProducerBeats);

router.patch('/',
            authMulterJWT,
            s3UploadeMiddleware.uploadS3ProfileImageFile('producer'),
            ProducerController.updateProducerProfile);

export default router;