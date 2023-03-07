import { Prisma } from '@prisma/client';


const updateNewTitleProducerPortfolio = async(userId: number, newId: number, transaction: Prisma.TransactionClient) => {
    
    try {

        const data = await transaction.producerPortfolio.update({

            data: { isTitle: true },

            where: {
                producerPortfolio: {
                    producerId: userId,
                    id: newId,
                }
            },

        });

        return data;

    } catch (error) {

        throw error;

    }
};


export default updateNewTitleProducerPortfolio;