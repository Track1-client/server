import { Router } from "express";
import { authMulterJWT, authJWT, checkPaginationValue, s3UploadeMiddleware } from '../../../global/middlewares';
import { BeatController } from '../controller';

const router: Router = Router();

router.post('/', 
            authMulterJWT, 
            s3UploadeMiddleware.uploadS3TracksFile,
            BeatController.createBeat);

router.get('/filter',
            checkPaginationValue,
            BeatController.getBeatList);

router.get('/:beatId',
            authJWT,
            BeatController.getBeat);

router.get('/:beatId/download',
            authJWT,
            BeatController.getBeatFile);

router.patch('/:beatId', 
            authMulterJWT, 
            s3UploadeMiddleware.uploadS3TracksFile,
            BeatController.updateBeat);

router.patch('/:beatId/closed',
            authJWT,
            BeatController.updateBeatClosed);

router.delete('/:beatId', authJWT, BeatController.deleteBeat);


export default router;