import { Prisma } from '@prisma/client';

const upsertVocalOrder = async(vocalId: number, tableName: string, tableId: number, transaction: Prisma.TransactionClient) => {
    try {
        const data = transaction.vocalOrder.upsert({
            where: {
                vocalId,
            },
            create: {
                commentOrPortfolio: tableName,
                commentIdOrPortfolioId: tableId,
                vocalId,
            },
            update: {
                commentOrPortfolio: tableName,
                commentIdOrPortfolioId: tableId,
            },
        });
        
        return data;
    } catch(error) {
        throw error;
    }
};

export default upsertVocalOrder;