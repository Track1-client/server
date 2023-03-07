import { Prisma } from '@prisma/client';


const updateOldTitleVocalPortfolio = async(userId: number, oldId: number, transaction: Prisma.TransactionClient) => {
    
    try {

        const data = await transaction.vocalPortfolio.update({
            data: {
                isTitle: false,
            },
            where: {
                vocalPortfolio: {
                    vocalId: userId,
                    id: oldId,
                },
            },
        });

        return data;

    } catch(error) {

        throw error;

    }

};


export default updateOldTitleVocalPortfolio;