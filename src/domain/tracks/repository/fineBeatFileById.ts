import config from '../../../global/config';
import prisma from '../../../global/config/prismaClient';
import { rm } from '../../../global/constants';
import { InvalidBeatId } from '../../../global/middlewares/error/errorInstance';
import { getS3OneBeatObject } from '../../../global/modules/S3Object/get';

function objectParams_url(audioKey: string) {
    return {
        Bucket: config.tracksBucketName,
        Key: audioKey,
    };
};

const findBeatFileById = async(beatId: number) => {
    try {
        const beat = await prisma.beat.findUnique({
                where: {
                    id: beatId,
                },
                select: {
                    id: true,
                    beatFile: true,
                    duration: true,
                },
            });
        
        if (!beat) throw new InvalidBeatId(rm.INVALID_BEAT_ID);
        const beatURL = await getS3OneBeatObject(objectParams_url(beat.beatFile));

        return { beat, beatURL };
    } catch(error) {
        throw error;
    }
};

export default findBeatFileById;