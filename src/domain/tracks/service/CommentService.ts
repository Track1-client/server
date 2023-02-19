import { rm } from '../../../global/constants';
import { CommentFileUploadFail, InvalidBeatId, InvalidVocalComment, NotVocal } from '../../../global/middlewares/error/errorInstance';
import deleteS3Audio from '../../../global/modules/S3Object/delete/deleteOneComment';
import { getUserById } from '../../user/repository';
import { CommentCreateDTO, CommentCreateReturnDTO, CommentDeleteDTO, CommentDeleteReturnDTO } from '../interfaces';
import { createCommentByUserId, deleteCommentById, getBeatById, getCommentByUserId } from '../repository';

const createComment = async (beatId: number, tableName: string, userId: number, commentDTO: CommentCreateDTO, audioKey: string) => {
    try {
        const isVocal = (await getUserById.vocal(userId)) && (tableName === 'vocal');
        if (!isVocal) throw new NotVocal(rm.NON_EXISTS_VOCAL);

        const isValidBeat = await getBeatById(beatId);
        if (!isValidBeat) throw new InvalidBeatId(rm.INVALID_BEAT_ID);

        const data = await createCommentByUserId(beatId, commentDTO, isValidBeat.producerId, userId, audioKey);
        if (!data) throw new CommentFileUploadFail(rm.UPLOAD_COMMENT_FAIL);

        const result: CommentCreateReturnDTO = {
            commentId: data.id,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteComment = async (commentDTO: CommentDeleteDTO, commentId: number) => {
    try {
        const isValidComment = await getCommentByUserId(commentId, Number(commentDTO.userId));
        if (!isValidComment || commentDTO.tableName !== 'vocal') throw new InvalidVocalComment(rm.INVALID_COMMENT);

        await deleteS3Audio(isValidComment.commentFile);  //! S3 객체 삭제 
        await deleteCommentById(commentId, Number(commentDTO.userId)); //! DB 삭제 

        const result: CommentDeleteReturnDTO = {
            vocalId: isValidComment.vocalId,
            beatId: isValidComment.beatId,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const CommentService = {
    createComment,
    deleteComment,
};

export default CommentService;