import prisma from '../../../../global/config/prismaClient';


const deleteProducerPortfolioByUserId = async(userId: number, portfolioId: number) => {

    try {

        await prisma.producerPortfolio.delete({

            where: {
                producerPortfolio: {
                    producerId: userId,
                    id: portfolioId,
                }
            }

        });

    } catch(error) {

        throw error;

    }

};


export default deleteProducerPortfolioByUserId;