import { Prisma } from '@prisma/client';
import { updateOldTitleVocalPortfolio, updateNewTitleVocalPortfolio } from '.';


class VocalTitleRepository {

    async updateNewTitle (userId: number, oldId: number, transaction: Prisma.TransactionClient) {
        return await updateNewTitleVocalPortfolio(userId, oldId, transaction);
    }

    async updateOldTitle (userId: number, newId: number, transaction: Prisma.TransactionClient) {
        return await updateOldTitleVocalPortfolio(userId, newId, transaction);
    }

}


export default VocalTitleRepository;