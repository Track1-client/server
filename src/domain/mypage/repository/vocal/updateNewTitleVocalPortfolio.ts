import { Prisma } from '@prisma/client';


const updateNewTitleVocalPortfolio = async(userId: number, newId: number, transaction: Prisma.TransactionClient) => {
    
    try {

        const data = await transaction.vocalPortfolio.update({

            data: { isTitle: true },

            where: {
                vocalPortfolio: {
                    vocalId: userId,
                    id: newId,
                }
            }

        });

        return data;

    } catch(error) {

        throw error;

    }

};


export default updateNewTitleVocalPortfolio;