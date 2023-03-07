import { PrismaClient } from '@prisma/client';
import { updateNewTitleProducerPortfolio, updateOldTitleProducerPortfolio } from '.';

class ProducerTitleRepository {
    async updateNewTitle (userId: number, oldId: number, transaction: PrismaClient) {
        return updateOldTitleProducerPortfolio(userId, oldId, transaction);
    }

    async updateOldTitle (userId: number, newId: number, transaction: PrismaClient) {
        return updateNewTitleProducerPortfolio(userId, newId, transaction);
    }
}

export default ProducerTitleRepository;