import prisma from '../../../global/config/prismaClient';

const deleteBeatByUserId = async(userId: number, beatId: number) => {
    try {
        await prisma.beat.delete({
            where: {
                producerBeat: {
                    id: beatId,
                    producerId: userId,
                },
            },
        });
    } catch(error) {
        throw error;
    }
};

export default deleteBeatByUserId;