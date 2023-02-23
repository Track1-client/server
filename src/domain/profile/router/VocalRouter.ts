import { Router } from "express";
import { authJWT, authMulterJWT, checkPaginationValue, s3UploadeMiddleware } from '../../../global/middlewares';
import VocalController from '../controller/VocalController';

const router: Router = Router();

router.get('/:vocalId',
            checkPaginationValue,
            authJWT,
            VocalController.getVocalProfile);

router.patch('/',
            authMulterJWT,
            s3UploadeMiddleware.uploadS3ProfileImageFile('vocal'),
            VocalController.updateVocalProfile);

export default router;