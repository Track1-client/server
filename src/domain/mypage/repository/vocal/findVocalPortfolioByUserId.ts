import prisma from '../../../../global/config/prismaClient';


const findVocalPortfolioByUserId = async(userId: number, portfolioId: number) => {

    try {

        const data = await prisma.vocalPortfolio.findUnique({

            where: {
                vocalPortfolio: {
                    vocalId: userId,
                    id: portfolioId
                }
            }

        });

        return data;

    } catch(error) {

        throw error;

    }

};


export default findVocalPortfolioByUserId;