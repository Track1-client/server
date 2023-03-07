import { Prisma } from '@prisma/client';
import { upsertVocalOrder } from '../../vocals/repository';
import { CommentCreateDTO } from '../interfaces';
import createCommentByUserId from './comment/createCommentByUserId';


class VocalCommentOrderRepository {

    async createVocalComment (beatId: number, commentDTO: CommentCreateDTO, beatProducerId: number, userId: number, audioKey: string, transaction: Prisma.TransactionClient) {
        return createCommentByUserId(beatId, commentDTO, beatProducerId, userId, audioKey, transaction);
    }

    async upsertVocalOrder (vocalId: number, tableName: string, tableId: number, transaction: Prisma.TransactionClient) {
        return upsertVocalOrder(vocalId, tableName, tableId, transaction);
    }

}


export default VocalCommentOrderRepository;