import prisma from '../../../../global/config/prismaClient';


const findBeatByUserId = async(userId: number, beatId: number) => {

    try {

        const beat = await prisma.beat.findUnique({

            where: {
                producerBeat: {
                    id: beatId,
                    producerId: userId,
                }
            }

        });
        
        return beat;

    } catch(error) {

        throw error;

    }

};


export default findBeatByUserId;