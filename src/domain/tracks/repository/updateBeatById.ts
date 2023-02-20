import getAudioDurationInSeconds from 'get-audio-duration';
import config from '../../../global/config';
import prisma from '../../../global/config/prismaClient';
import convertCategory from '../../../global/modules/convertCategory';
import getS3OneBeatObject from '../../../global/modules/S3Object/get/getOneBeatObject';
import { BeatCreateDTO } from '../interfaces';

function objectParams_url(audioKey: string) {
    return {
        Bucket: config.tracksBucketName,
        Key: audioKey,
    };
};

const updateBeatById = async(beatDTO: BeatCreateDTO, beatId: number, userId: number, audioKey: string, imageKey: string) => {
    try {
        const audioSignedURL = await getS3OneBeatObject(objectParams_url(audioKey));   //! 객체의 signedURL 받아오기 

        const beat = await prisma.beat.update({
            data: {
                title: beatDTO.title,
                category: convertCategory(beatDTO.category),
                beatFile: audioKey,
                introduce: beatDTO.introduce,
                keyword: beatDTO.keyword,
                beatImage: imageKey,
                duration: await getAudioDurationInSeconds(audioSignedURL as string), 
                Producer: {
                    connect: {
                        id: userId,
                    },
                },
            },
            where: {
                producerBeat: {
                    id: beatId,
                    producerId: userId,
                },
            },
        });
        
        return beat;
    } catch(error) {
        throw error;
    }
};

export default updateBeatById;