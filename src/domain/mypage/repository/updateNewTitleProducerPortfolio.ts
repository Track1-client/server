import prisma from '../../../global/config/prismaClient';

const updateNewTitleProducerPortfolio = async(userId: number, newId: number) => {
    try {
        
        const data = await prisma.producerPortfolio.update({
            data: {
                isTitle: true,
            },
            where: {
                producerPortfolio: {
                    producerId: userId,
                    id: newId,
                }, 
            },
        });

        return data;
    } catch (error) {
        throw error;
    }
};

export default updateNewTitleProducerPortfolio;