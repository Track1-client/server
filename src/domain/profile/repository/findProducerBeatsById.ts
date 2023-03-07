import config from '../../../global/config';
import prisma from '../../../global/config/prismaClient';
import { BeatReturnDTO } from '../interfaces';
import { getS3OneBeatObject, getS3OneImageObject } from '../../../global/modules/S3Object/get';


function objectParams_url(bucketName: string, fileKey: string) {

    return {

        Bucket: bucketName,
        Key: fileKey

    };

};


const findProducerBeatsById = async(producerId: number, limit: number, page: number) => {

    try {

        const data = await prisma.beat
            .findMany({

                where: { producerId },
                orderBy: { createdAt: 'desc' },
                skip: (page-1)*limit,
                take: limit

            })
            .then(async (beat) => {

                const beatList = await Promise.all(beat.map(async (beat) => {

                    const beatURL = await getS3OneBeatObject(objectParams_url(config.tracksBucketName, beat.beatFile));
                    const imageURL = (beat.beatImage === config.defaultJacketAndProducerPortfolioImage) ? 
                                        beat.beatImage : 
                                        await getS3OneImageObject(objectParams_url(config.tracksBucketName, beat.beatImage));

                    const beatDTO: BeatReturnDTO = {

                        id: beat.id, 
                        jacketImage: imageURL as string,
                        beatWavFile: beatURL as string,
                        title: beat.title,
                        content: beat.introduce as string,
                        keyword: beat.keyword,
                        category: beat.category[0] as string,
                        wavFileLength: beat.duration,
                        isSelected: beat.isClosed

                    };

                    return beatDTO;

                }));

                return beatList;

            });

        return data;

    } catch (error) {

        throw error;

    }

};


export default findProducerBeatsById;