import prisma from '../../../global/config/prismaClient';

const upsertVocalOrder = async(vocalId: number, tableName: string, tableId: number) => {
    try {
        const data = prisma.vocalOrder.upsert({
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