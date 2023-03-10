import { Prisma } from '@prisma/client';
import { updateNewTitleProducerPortfolio, updateOldTitleProducerPortfolio } from '.';


class ProducerTitleRepository {

    async updateNewTitle (userId: number, oldId: number, transaction: Prisma.TransactionClient) {
        return await updateNewTitleProducerPortfolio(userId, oldId, transaction);
    }  

    async updateOldTitle (userId: number, newId: number, transaction: Prisma.TransactionClient) {
        return await updateOldTitleProducerPortfolio(userId, newId, transaction);
    }

}

export default ProducerTitleRepository;