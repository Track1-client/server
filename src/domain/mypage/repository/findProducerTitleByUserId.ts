import prisma from '../../../global/config/prismaClient';

const findProducerTitlePortfolio = async(userId: number) => {
    try {
        const data = await prisma.producerPortfolio.findFirst({
            where: {
                producerId: userId,
                isTitle: true,
            },
            select: {
                id: true,
            },
        });

        return data;
    } catch(error) {
        throw error;
    }
};

export default findProducerTitlePortfolio;