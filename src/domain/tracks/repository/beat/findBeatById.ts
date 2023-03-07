import prisma from '../../../../global/config/prismaClient';


const findBeatById = async(beatId: number) => {

    try {

        const beat = await prisma.beat.findUnique({

            where: { id: beatId }

        });
    
        return beat;

    } catch(error) {

        throw error;

    }

};


export default findBeatById;