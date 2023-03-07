import { PrismaClient } from '@prisma/client';
import { updateOldTitleVocalPortfolio, updateNewTitleVocalPortfolio } from '.';

class VocalTitleRepository {
    async updateNewTitle (userId: number, oldId: number, transaction: PrismaClient) {
        return updateOldTitleVocalPortfolio(userId, oldId, transaction);
    }

    async updateOldTitle (userId: number, newId: number, transaction: PrismaClient) {
        return updateNewTitleVocalPortfolio(userId, newId, transaction);
    }
}

export default VocalTitleRepository;