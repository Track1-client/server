import { Router } from "express";
import { authMulterJWT, authJWT, checkPaginationValue, s3UploadeMiddleware } from '../../../global/middlewares';
import { CommentController } from '../controller';

const router: Router = Router();

router.post('/:beatId', 
            authMulterJWT, 
            s3UploadeMiddleware.uploadS3CommentFile,
            CommentController.createComment);


export default router;