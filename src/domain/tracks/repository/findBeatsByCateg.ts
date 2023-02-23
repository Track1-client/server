import config from '../../../global/config';
import prisma from '../../../global/config/prismaClient';
import { getS3OneBeatObject, getS3OneImageObject } from '../../../global/modules/S3Object/get';
import { GetBeatReturnDTO } from '../interfaces';

function objectParams_url(audioKey: string) {
    return {
        Bucket: config.tracksBucketName,
        Key: audioKey,
    };
};

const findBeatsByCateg = async(page: number, limit: number, categ: string[]) => {
    try {
        //! 작업물 최신순 정렬
        const dataList = await prisma.beat
            .findMany({
                select:{
                    id: true,
                    beatImage: true,
                    beatFile: true,
                    title: true,
                    Producer: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    keyword: true,
                    category: true,
                    duration: true,
                },
                where: {
                    AND: 
                        [
                            { category: { hasSome: categ } },
                            { isClosed: false }
                        ],
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip: (page-1)*limit,
                take: limit,
            })
            .then(async (trackList) => {
                    return await Promise.all(trackList.map(async (track) => {
                        const beatURL = await getS3OneBeatObject(objectParams_url(track.beatFile));
                        const imageURL = (track.beatImage === config.defaultJacketAndProducerPortfolioImage) ? 
                                            track.beatImage : await getS3OneImageObject(objectParams_url(track.beatImage));
            
                        const returnDTO: GetBeatReturnDTO = {
                            beatId: track.id,
                            jacketImage: imageURL as string,
                            wavFile: beatURL as string,
                            title: track.title,
                            producerId: track.Producer.id,
                            producerName: track.Producer.name,
                            keyword: track.keyword,
                            category: track.category[0],
                            wavFileLength: track.duration,
                        }
                        return returnDTO;
                    }));
            });

        return dataList;
    } catch(error) {
        throw error;
    }
};

export default findBeatsByCateg;
