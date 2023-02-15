import { Router } from "express";
import { authJWT, checkPaginationValue, s3UploadeMiddleware } from '../../../global/middlewares';
import { BeatController } from '../controller';

const router: Router = Router();

router.post('/', 
            authJWT, 
            s3UploadeMiddleware.uploadS3TracksFile,
            BeatController.createBeat);

router.get('/filter', 
            authJWT,
            checkPaginationValue,
            BeatController.getBeatList);

router.patch('/:beatId', 
            authJWT, 
            s3UploadeMiddleware.uploadS3TracksFile,
            BeatController.updateBeat);

router.delete('/:beatId', authJWT, BeatController.deleteBeat);


export default router;