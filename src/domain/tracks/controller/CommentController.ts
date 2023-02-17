import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import getLocation from '../../../global/modules/file/multer/key';
import { CommentCreateDTO } from '../interfaces';
import { CommentService } from '../service';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const audioFileKey: Express.MulterS3.File = req.file as Express.MulterS3.File;
        const audioKey = getLocation.getAudioFileKey(audioFileKey);

        const commentDTO: CommentCreateDTO = req.body;
        const { beatId } = req.params;
        const { tableName, userId } = req.headers;
        
        const result = await CommentService.createComment(Number(beatId), String(tableName), Number(userId), commentDTO, audioKey);
        return res.status(sc.OK).send(success(sc.OK, rm.UPLOAD_TRACK_FILE_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const CommentController = {
    createComment,
};

export default CommentController;