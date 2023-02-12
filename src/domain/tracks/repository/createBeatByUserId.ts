import prisma from '../../../global/config/prismaClient';
import { BeatCreatDTO } from '../interfaces';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import convertCategory from '../../../global/modules/convertCategory';

const createBeatByUserId = async(beatDTO: BeatCreatDTO, audio: string, image: string) => {
    try {
        const data = await prisma.beat.create({
            data: {
                title: beatDTO.title,
                category: convertCategory(beatDTO.category),
                beatFile: audio,
                introduce: beatDTO.introduce,
                keyword: beatDTO.keyword,
                producerId: beatDTO.userId,
                beatImage: image,
                duration: await getAudioDurationInSeconds(audio),
            },
            select: {
                id: true,
            },
        });

        return data;
    } catch(error) {
        throw error;
    }
};

export default createBeatByUserId;