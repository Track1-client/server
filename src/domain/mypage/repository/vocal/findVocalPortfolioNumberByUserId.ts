import prisma from '../../../../global/config/prismaClient';


const findVocalPortfolioNumberByUserId = async(userId: number) => {

    try {

        const number = await prisma.vocalPortfolio.count({

            where: { vocalId: userId }

        });

        return number;

    } catch(error) {

        throw error;

    }

};


export default findVocalPortfolioNumberByUserId;