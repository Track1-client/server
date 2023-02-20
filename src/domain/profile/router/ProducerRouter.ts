import { Router } from "express";
import { authJWT, authMulterJWT, s3UploadeMiddleware } from '../../../global/middlewares';
import ProducerController from '../controller/ProducerController';

const router: Router = Router();

router.patch('/',
            authMulterJWT,
            s3UploadeMiddleware.uploadS3ProfileImageFile('producer'),
            ProducerController.updateProducerProfile,
);

export default router;