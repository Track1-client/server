import prisma from '../../../../global/config/prismaClient';
import { BeatCreateDTO } from '../../interfaces';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import convertCategory from '../../../../global/modules/convertCategory';
import config from '../../../../global/config';
import getS3OneBeatObject from '../../../../global/modules/S3Object/get/getOneBeatObject';


function objectParams_url(audioKey: string) {

    return {

        Bucket: config.tracksBucketName,
        Key: audioKey

    };

};


const createBeatByUserId = async(beatDTO: BeatCreateDTO, userId: number, audioKey: string, imageKey: string) => {

    try {

        const audioSignedURL = await getS3OneBeatObject(objectParams_url(audioKey));   //! 객체의 signedURL 받아오기 
        
        const data = await prisma.beat.create({

            data: {
                title: beatDTO.title,
                category: convertCategory(beatDTO.category),
                beatFile: audioKey,
                introduce: beatDTO.introduce,
                keyword: beatDTO.keyword,
                beatImage: imageKey,
                duration: await getAudioDurationInSeconds(audioSignedURL as string),  //! signedURL을 통해 오디오파일 전체 재생시간 받아오기 
                Producer: { connect: { id: userId } }
            },

            select: { id: true }

        });

        return data;

    } catch(error) {

        throw error;

    }

};


export default createBeatByUserId;