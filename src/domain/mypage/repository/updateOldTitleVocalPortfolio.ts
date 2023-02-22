import prisma from '../../../global/config/prismaClient';

const updateOldTitleVocalPortfolio = async(userId: number, oldId: number) => {
    try {
        const data = await prisma.vocalPortfolio.update({
            data: {
                isTitle: false,
            },
            where: {
                vocalPortfolio: {
                    vocalId: userId,
                    id: oldId,
                },
            },
        });

        return data;
    } catch(error) {
        throw error;
    }
};

export default updateOldTitleVocalPortfolio;