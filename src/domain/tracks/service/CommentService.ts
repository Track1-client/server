import { rm } from '../../../global/constants';
import { CommentFileUploadFail, InvalidBeatId, NotVocal } from '../../../global/middlewares/error/errorInstance';
import { getUserById } from '../../user/repository';
import { CommentCreateDTO, CommentCreateReturnDTO } from '../interfaces';
import { createCommentByUserId, findBeatById } from '../repository';

const createComment = async (beatId: number, tableName: string, userId: number, commentDTO: CommentCreateDTO, audioKey: string) => {
    try {
        const isVocal = (await getUserById.vocal(userId)) && (tableName === 'vocal');
        if (!isVocal) throw new NotVocal(rm.NON_EXISTS_VOCAL);

        const isValidBeat = await findBeatById(beatId);
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

const CommentService = {
    createComment,
};

export default CommentService;