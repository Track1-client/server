import { rm } from '../../../global/constants';
import { CommentFileUpdateFail, CommentFileUploadFail, InvalidBeatId, InvalidVocalComment, NotVocal } from '../../../global/middlewares/error/errorInstance';
import deleteS3CommentAudio from '../../../global/modules/S3Object/delete/deleteOneComment';
import updateS3CommentAudio from '../../../global/modules/S3Object/update/updateOneComment';
import { getUserById } from '../../user/repository';
import { CommentCreateDTO, CommentCreateReturnDTO, CommentDeleteDTO, CommentDeleteReturnDTO, CommentUpdateDTO, CommentUpdateReturnDTO } from '../interfaces';
import { createCommentByUserId, deleteCommentById, getBeatById, getCommentByUserId, updateCommentById } from '../repository';

const createComment = async (beatId: number, tableName: string, userId: number, commentDTO: CommentCreateDTO, audioFileKey: string) => {
    try {
        const isVocal = (await getUserById.vocal(userId)) && (tableName === 'vocal');
        if (!isVocal) throw new NotVocal(rm.NON_EXISTS_VOCAL);

        const isValidBeat = await getBeatById(beatId);
        if (!isValidBeat) throw new InvalidBeatId(rm.INVALID_BEAT_ID);

        const data = await createCommentByUserId(beatId, commentDTO, isValidBeat.producerId, userId, audioFileKey);
        if (!data) throw new CommentFileUploadFail(rm.UPLOAD_COMMENT_FAIL);

        const result: CommentCreateReturnDTO = {
            commentId: data.id,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const updateComment = async (commentId: number, tableName: string, userId: number, commentDTO: CommentUpdateDTO, audioFileKey: string) => {
    try {
        const isValidComment = await getCommentByUserId(commentId, Number(userId));
        if (!isValidComment || tableName !== 'vocal') throw new InvalidVocalComment(rm.INVALID_COMMENT);

        //* S3 객체 삭제
        let commentAudio = ( audioFileKey ) ? isValidComment.commentFile : undefined;  //& 수정할 오디오 존재하는 경우, 기존 게시글의 오디오객체 삭제 
        await updateS3CommentAudio(commentAudio as string); 

        //* DB 업데이트
        commentAudio = ( audioFileKey ) ? audioFileKey : isValidComment.commentFile;  //& 수정할 오디오 존재하면 해당 오디오파일key값, 아니면 기존 오디오파일key값
        const data = await updateCommentById(commentDTO, commentId, userId, String(commentAudio)); 
        if (!data) throw new CommentFileUpdateFail(rm.UPDATE_COMMENT_FAIL);

        const result: CommentUpdateReturnDTO = {
            audioFile: data.audioSignedURL as string,
            vocalName: data.comment.Vocal.name,
            content: data.comment.content as string,
            audioFileLength: data.comment.duration,
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

        await deleteS3CommentAudio(isValidComment.commentFile);  //! S3 객체 삭제 
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
    updateComment,
    deleteComment,
};

export default CommentService;