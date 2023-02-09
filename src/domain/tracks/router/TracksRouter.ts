import { Router } from "express";
import { authJWT, s3UploadeMiddleware } from '../../../global/middlewares';
import { TrackController } from '../controller';

const router: Router = Router();

router.post('/', 
            s3UploadeMiddleware.uploadS3TracksFile,
            authJWT, 
            TrackController.createBeat
);


export default router;