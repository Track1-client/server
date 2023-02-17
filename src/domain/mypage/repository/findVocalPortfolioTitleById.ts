import prisma from '../../../global/config/prismaClient';

const findVocalPortfolioTitleById = async(userId: number) => {
    try {
        const title = await prisma.vocalPortfolio.findFirst({
            where: {
                isTitle: true,
                vocalId: userId,
            },
        });

        return title;
    } catch(error) {
        throw error;
    }
};

export default findVocalPortfolioTitleById;