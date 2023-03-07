import prisma from '../../../../global/config/prismaClient';


const deleteVocalPortfolioByUserId = async(userId: number, portfolioId: number) => {
    
    try {

        await prisma.vocalPortfolio.delete({

            where: {
                vocalPortfolio: {
                    vocalId: userId,
                    id: portfolioId
                }
            }

        });

    } catch(error) {

        throw error;

    }

};


export default deleteVocalPortfolioByUserId;