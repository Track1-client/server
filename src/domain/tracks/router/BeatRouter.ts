import { Router } from "express";
import { authJWT, s3UploadeMiddleware } from '../../../global/middlewares';
import { BeatController } from '../controller';

const router: Router = Router();

router.post('/', 
            s3UploadeMiddleware.uploadS3TracksFile,
            authJWT, 
            BeatController.createBeat
);

router.patch('/:beatId', 
            s3UploadeMiddleware.updateS3TracksFile,
            authJWT, 
            BeatController.updateBeat);

router.delete('/:beatId', authJWT, BeatController.deleteBeat);


export default router;