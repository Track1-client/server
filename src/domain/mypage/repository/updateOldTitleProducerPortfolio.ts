import prisma from '../../../global/config/prismaClient';

const updateOldTitleProducerPortfolio = async(userId: number, oldId: number) => {
    try {
        const data = await prisma.producerPortfolio.update({
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