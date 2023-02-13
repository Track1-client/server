import prisma from '../../../global/config/prismaClient';
import { BeatUpdateDTO } from '../interfaces';

const updateBeatById = async(beatDTO: BeatUpdateDTO) => {
    try {
        const beat = await prisma.beat.update({
            data: {
                
            },
            where: {
                id: beatDTO.beatId,
            },
        });
        
        return beat;
    } catch(error) {
        throw error;
    }
};

export default updateBeatById;