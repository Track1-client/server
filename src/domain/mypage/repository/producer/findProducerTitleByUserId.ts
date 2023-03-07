import prisma from '../../../../global/config/prismaClient';
import { rm } from '../../../../global/constants';
import { ProducerTitleNotFound } from '../../../../global/middlewares/error/errorInstance';


const findProducerTitlePortfolio = async(userId: number) => {

    try {

        const data = await prisma.producerPortfolio.findFirstOrThrow({

            where: {
                producerId: userId,
                isTitle: true
            },

            select: {
                id: true
            }

        });

        return data;

    } catch(error) {

        throw new ProducerTitleNotFound(rm.PRODUCER_TITLE_NOT_FOUND);

    }
    
};


export default findProducerTitlePortfolio;