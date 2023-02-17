import prisma from '../../../global/config/prismaClient';

const findProducerPortfolioTitleById = async(userId: number) => {
    try {
        const title = await prisma.producerPortfolio.findFirst({
            where: {
                isTitle: true,
                producerId: userId,
            },
        });

        return title;
    } catch(error) {
        throw error;
    }
};

export default findProducerPortfolioTitleById;