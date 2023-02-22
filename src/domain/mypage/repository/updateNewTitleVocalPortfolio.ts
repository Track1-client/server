import prisma from '../../../global/config/prismaClient';

const updateNewTitleVocalPortfolio = async(userId: number, newId: number) => {
    try {
        const data = await prisma.vocalPortfolio.update({
            data: {
                isTitle: true,
            },
            where: {
                vocalPortfolio: {
                    vocalId: userId,
                    id: newId,
                },
            },
        });

        return data;
    } catch(error) {
        throw error;
    }
};

export default updateNewTitleVocalPortfolio;