import prisma from '../../../global/config/prismaClient';
import { rm } from '../../../global/constants';
import { CommentFilesGetFail, CommentFileUpdateFail, CommentFileUploadFail, InvalidBeatId, InvalidVocalComment, NotVocal } from '../../../global/middlewares/error/errorInstance';
import deleteS3CommentAudio from '../../../global/modules/S3Object/delete/deleteOneComment';
import updateS3CommentAudio from '../../../global/modules/S3Object/update/updateOneComment';
import { getUserById } from '../../user/repository';
import { BeatGetDTO, CommentCreateDTO, CommentCreateReturnDTO, CommentDeleteDTO, CommentDeleteReturnDTO, CommentUpdateDTO, CommentUpdateReturnDTO } from '../interfaces';
import { deleteCommentById, getBeatById, getCommentById, getCommentByUserId, updateCommentById } from '../repository';
import VocalCommentOrderRepository from '../repository/VocalCommentOrderRepository';


const vocalCommentOrderRepository = new VocalCommentOrderRepository();


const createComment = async (beatId: number, tableName: string, userId: number, commentDTO: CommentCreateDTO, audioFileKey: string) => {
    
    try {

        const isVocal = (await getUserById.vocal(userId)) && (tableName === 'vocal');
        if (!isVocal) throw new NotVocal(rm.NON_EXISTS_VOCAL);

        const isValidBeat = await getBeatById(beatId);
        if (!isValidBeat) throw new InvalidBeatId(rm.INVALID_BEAT_ID);

        const resultPrisma = await prisma.$transaction(async ($transaction) => {

            return await vocalCommentOrderRepository.createVocalComment(beatId, commentDTO, isValidBeat.producerId, userId, audioFileKey, $transaction)
                                .then(async (comment) => {
                                    
                                    await vocalCommentOrderRepository.upsertVocalOrder(comment.vocalId, 'commemt', comment.id, $transaction); //! vocalOrder 생성 또는 업데이트 
                                    return comment;

                                })  
                                .catch((error) => { throw new CommentFileUploadFail(rm.UPLOAD_COMMENT_FAIL) })
        
        });

        const result: CommentCreateReturnDTO = {

            commentId: resultPrisma.id

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const getCommentList = async (beatDTO: BeatGetDTO, beatId: number, page: number, limit: number) => {

    try {

        const data = await getCommentById(beatDTO, beatId, page, limit);
        if (!data) throw new CommentFilesGetFail(rm.GET_COMMENT_LIST_FAIL);

        return data;

    } catch (error) {

        throw error;

    }

};


const updateComment = async (commentId: number, tableName: string, userId: number, commentDTO: CommentUpdateDTO, audioFileKey: string) => {
    
    try {

        const isValidComment = await getCommentByUserId(commentId, Number(userId));
        if (!isValidComment || tableName !== 'vocal') throw new InvalidVocalComment(rm.INVALID_COMMENT);

        const oldCommentAudio = ( audioFileKey ) ? isValidComment.commentFile : undefined;  //& 수정할 오디오 존재하는 경우, 기존 게시글의 오디오객체 삭제 
        const newCommentAudio = ( audioFileKey ) ? audioFileKey : isValidComment.commentFile;  //& 수정할 오디오 존재하면 해당 오디오파일key값, 아니면 기존 오디오파일key값
        
        
        //* DB 업데이트
        const data = await updateCommentById(commentDTO, commentId, userId, String(newCommentAudio)); 
        if (!data) throw new CommentFileUpdateFail(rm.UPDATE_COMMENT_FAIL);
        

        //* S3 객체 삭제
        await updateS3CommentAudio(oldCommentAudio as string); 


        const result: CommentUpdateReturnDTO = {

            audioFile: data.audioSignedURL as string,
            vocalName: data.comment.Vocal.name,
            content: data.comment.content as string,
            audioFileLength: data.comment.duration

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

        
        await deleteCommentById(commentId, Number(commentDTO.userId)); //! DB 삭제 
        await deleteS3CommentAudio(isValidComment.commentFile);  //! S3 객체 삭제 


        const result: CommentDeleteReturnDTO = {

            vocalId: isValidComment.vocalId,
            beatId: isValidComment.beatId

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const CommentService = {

    createComment,
    getCommentList,
    updateComment,
    deleteComment

};


export default CommentService;