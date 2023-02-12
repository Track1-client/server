import prisma from '../../../global/config/prismaClient';
import { rm } from '../../../global/constants';
import { NotProducerBeat } from '../../../global/middlewares/error/errorInstance';

const deleteBeatByUserId = async(userId: number, beatId: number) => {
    try {
        const beat = await prisma.beat.delete({
            where: {
                producerBeat: {
                    id: beatId,
                    producerId: userId,
                },
            },
        });
        
        if (!beat) throw new NotProducerBeat(rm.PRODUCER_BEAT_UNMATCH);
        return beat;
    } catch(error) {
        throw error;
    }
};

export default deleteBeatByUserId;