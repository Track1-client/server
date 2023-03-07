import { Prisma } from '@prisma/client';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import convertCategory from '../../../../global/modules/convertCategory';
import config from '../../../../global/config';
import getS3OneBeatObject from '../../../../global/modules/S3Object/get/getOneBeatObject';
import { PortfolioCreateDTO } from '../../interfaces';


function objectParams_url(audioKey: string) {

    return {

        Bucket: config.vocalPortfolioBucketName,
        Key: audioKey
        
    };
    
};


const createVocalPortfolioByUserId = async(portfolioDTO: PortfolioCreateDTO, userId: number, isTitle: boolean, audioKey: string, imageKey: string, transaction: Prisma.TransactionClient) => {
    
    try {

        const audioSignedURL = await getS3OneBeatObject(objectParams_url(audioKey));   //! 객체의 signedURL 받아오기 
        
        const data = await transaction.vocalPortfolio.create({

            data: {
                portfolioImage: imageKey,
                title: portfolioDTO.title,
                portfolioFile: audioKey,
                category: convertCategory(portfolioDTO.category),
                content: portfolioDTO.content,
                keyword: portfolioDTO.keyword,
                duration: await getAudioDurationInSeconds(audioSignedURL as string),
                isTitle,
                Vocal: { connect: { id: userId } },
            },

            select: {
                id: true,
                vocalId: true,
            }

        });

        return data;

    } catch(error) {

        throw error;

    }

};


export default createVocalPortfolioByUserId;