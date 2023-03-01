import prisma from '../../../global/config/prismaClient';
import { PortfolioDTO } from '../interfaces';
import { rm } from '../../../global/constants';
import { getS3OneBeatObject, getS3OneImageObject } from '../../../global/modules/S3Object/get';
import config from '../../../global/config';
import { InvalidVocalTitlePortfolio } from '../../../global/middlewares/error/errorInstance';

function objectParams_url(bucketName: string, fileKey: string) {
    return {
        Bucket: bucketName,
        Key: fileKey,
    };
};

const findVocalTitleByUserIdAsPortfolioDTO = async(userId: number) => {
    try {
        const data = await prisma.vocalPortfolio
            .findFirst({
                where: { vocalId: userId, isTitle: true },
            })
            .then(async (title) => {
                if (!title) return undefined;

                const beatURL = await getS3OneBeatObject(objectParams_url(config.vocalPortfolioBucketName, title.portfolioFile));
                const imageURL = (title.portfolioImage === config.defaultVocalPortfolioImage) ? 
                                    title.portfolioImage : 
                                    await getS3OneImageObject(objectParams_url(config.vocalPortfolioBucketName, title.portfolioImage));

                const portfolioDTO: PortfolioDTO = {
                    id: title.id,
                    jacketImage: imageURL as string,
                    beatWavFile: beatURL as string,
                    title: title.title,
                    content: title.content as string,
                    keyword: title.keyword,
                    category: title.category[0] as string,
                    wavFileLength: title.duration,
                };

                return portfolioDTO;
            });

        return data;
    } catch(error) {
        throw error;
    }
};

export default findVocalTitleByUserIdAsPortfolioDTO;