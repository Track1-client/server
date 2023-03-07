import prisma from '../../../../global/config/prismaClient';

const findProducerPortfolioByUserId = async(userId: number, portfolioId: number) => {
    try {
        const data = await prisma.producerPortfolio.findUnique({
            where: {
                producerPortfolio: {
                    producerId: userId,
                    id: portfolioId,
                },
            },
        });

        return data;
    } catch(error) {
        throw error;
    }
};

export default findProducerPortfolioByUserId;