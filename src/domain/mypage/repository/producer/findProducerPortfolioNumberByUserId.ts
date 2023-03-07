import prisma from '../../../../global/config/prismaClient';

const findProducerPortfolioNumberByUserId = async(userId: number) => {
    try {
        const number = await prisma.producerPortfolio.count({
            where: {
                producerId: userId,
            },
        });

        return number;
    } catch(error) {
        throw error;
    }
};

export default findProducerPortfolioNumberByUserId;