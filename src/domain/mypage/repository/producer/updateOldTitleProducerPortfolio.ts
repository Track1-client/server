import { Prisma } from '@prisma/client';


const updateOldTitleProducerPortfolio = async(userId: number, oldId: number, transaction: Prisma.TransactionClient) => {
    
    try {

        const data = await transaction.producerPortfolio.update({
            data: {
                isTitle: false,
            },
            where: {
                producerPortfolio: {
                    producerId: userId,
                    id: oldId,
                },
            },
        });
        
        return data;

    } catch(error) {

        throw error;

    }

};


export default updateOldTitleProducerPortfolio;