import { Prisma } from '@prisma/client';
import { createVocalPortfolioByUserId } from '.';
import { upsertVocalOrder } from '../../vocals/repository';
import { PortfolioCreateDTO } from '../interfaces';


class VocalPortfolioOrderRepository {

    async createVocalPortfolio (portfolioDTO: PortfolioCreateDTO, userId: number, isTitle: boolean, audioKey: string, imageKey: string, transaction: Prisma.TransactionClient) {
        return createVocalPortfolioByUserId(portfolioDTO, userId, isTitle, audioKey, imageKey, transaction);
    }

    async upsertVocalOrder (vocalId: number, tableName: string, tableId: number, transaction: Prisma.TransactionClient) {
        return upsertVocalOrder(vocalId, tableName, tableId, transaction);
    }

}


export default VocalPortfolioOrderRepository;