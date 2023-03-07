import prisma from '../../../../global/config/prismaClient';
import { rm } from '../../../../global/constants';
import { VocalTitleNotFound } from '../../../../global/middlewares/error/errorInstance';

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
        throw new VocalTitleNotFound(rm.VOCAL_TITLE_NOT_FOUND);
    }
};

export default findVocalPortfolioTitleById;