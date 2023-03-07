import prisma from '../../../../global/config/prismaClient';


const updateBeatClosedById = async(beatId: number, isClosed: boolean) => {

    try {

        const beat = await prisma.beat.update({

            data: { isClosed: !isClosed },
            where: { id: beatId }
            
        });

        return beat;

    } catch(error) {

        throw error;

    }

};


export default updateBeatClosedById;