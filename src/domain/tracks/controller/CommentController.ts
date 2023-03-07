import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import getLocation from '../../../global/modules/file/multer/key';
import { BeatGetDTO, CommentCreateDTO, CommentDeleteDTO, CommentUpdateDTO } from '../interfaces';
import { CommentService } from '../service';


const createComment = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const audioFileKey: Express.MulterS3.File = req.file as Express.MulterS3.File;
        const audioKey = getLocation.getAudioFileKey(audioFileKey);

        const commentDTO: CommentCreateDTO = req.body;
        const { beatId } = req.params;
        const { tableName, userId } = req.headers;
        
        const result = await CommentService.createComment(Number(beatId), String(tableName), Number(userId), commentDTO, audioKey);
        
        return res.status(sc.CREATED).send(success(sc.CREATED, rm.UPLOAD_COMMENT_SUCCESS, result));

    } catch (error) {

        return next(error);

    }

};


const getCommentList = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { page, limit } = req.query;
        const { beatId } = req.params;
        const beatDTO: BeatGetDTO = req.body;

        const result = await CommentService.getCommentList(beatDTO, Number(beatId), Number(page), Number(limit));

        return res.status(sc.OK).send(success(sc.OK, rm.GET_COMMENT_LIST_SUCCESS, result));

    } catch (error) {

        return next(error);

    }

};


const updateComment = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const audioFileKey: Express.MulterS3.File = req.file as Express.MulterS3.File;
        const audioKey = getLocation.updateAudioFileKey(audioFileKey);

        const commentDTO: CommentUpdateDTO = req.body;
        const { tableName, userId } = req.headers;
        const { commentId } = req.params;

        const result = await CommentService.updateComment(Number(commentId), String(tableName), Number(userId), commentDTO, audioKey);

        return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_COMMENT_SUCCESS, result));

    } catch (error) {

        return next(error);

    }

};


const deleteComment = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const commentDTO: CommentDeleteDTO = req.body;
        const { commentId } = req.params;

        const result = await CommentService.deleteComment(commentDTO, Number(commentId));
        return res.status(sc.OK).send(success(sc.OK, rm.DELETE_COMMENT_SUCCESS, result));

    } catch (error) {

        return next(error);

    }

};


const CommentController = {

    createComment,
    getCommentList,
    updateComment,
    deleteComment

};


export default CommentController;