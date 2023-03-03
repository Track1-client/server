import config from '../../../global/config';
import prisma from '../../../global/config/prismaClient';
import { rm } from '../../../global/constants';
import { InvalidBeatId } from '../../../global/middlewares/error/errorInstance';
import { getS3OneBeatObject, getS3OneImageObject } from '../../../global/modules/S3Object/get';
import { GetOneBeatReturnDTO } from '../interfaces';

function objectParams_url(bucket: string, audioKey: string) {
    const bucketName = (bucket === 'beat') ? config.tracksBucketName : config.profileImageBucketName;

    return {
        Bucket: bucketName,
        Key: audioKey,
    };
};

const findBeatByIdAndUserId = async(beatId: number, tableName: string, userId: number) => {
    try {
        const beat = await prisma.beat.findUnique({
            where: { id: beatId },
            select: { id: true, beatFile: true, beatImage: true, title: true, introduce: true, keyword: true, category: true, duration: true, isClosed: true,
                Producer: { select: { id: true, producerImage: true, name: true } } 
            }
        });
        if (!beat) throw new InvalidBeatId(rm.INVALID_BEAT_ID);

        const beatURL = await getS3OneBeatObject(objectParams_url('beat', beat.beatFile));
        const imageURL = (beat.beatImage === config.defaultJacketAndProducerPortfolioImage) ? 
                            beat.beatImage : await getS3OneImageObject(objectParams_url('beat', beat.beatImage));

        const producerImageURL = await getS3OneImageObject(objectParams_url('profile', beat.Producer.producerImage));
        const isMe = (beat.Producer.id === userId && tableName === 'producer') ? true : false;
        
        const result: GetOneBeatReturnDTO = {
            beatId: beat.id,
            jacketImage: imageURL as string,
            beatWavFile: beatURL as string,
            title: beat.title,
            producerName: beat.Producer.name,
            producerId: beat.Producer.id,
            producerProfileImage: producerImageURL as string,
            introduce: beat.introduce as string,
            keyword: beat.keyword,
            category: beat.category[0],
            isMe,
            wavFileLength: beat.duration,
            isClosed: beat.isClosed
        };
        return result;
    } catch(error) {
        throw error;
    }
};

export default findBeatByIdAndUserId;