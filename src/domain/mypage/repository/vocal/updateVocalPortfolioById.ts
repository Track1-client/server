import prisma from '../../../../global/config/prismaClient';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import convertCategory from '../../../../global/modules/convertCategory';
import config from '../../../../global/config';
import getS3OneBeatObject from '../../../../global/modules/S3Object/get/getOneBeatObject';
import { PortfolioUpdateDTO } from '../../interfaces';


function objectParams_url(audioKey: string) {

    return {
        Bucket: config.vocalPortfolioBucketName,
        Key: audioKey,
    };

};


const updateVocalPortfolioById = async(portfolioDTO: PortfolioUpdateDTO, portfolioId: number, userId: number, audioKey: string, imageKey: string) => {
    
    try {

        const audioSignedURL = await getS3OneBeatObject(objectParams_url(audioKey));   //! 객체의 signedURL 받아오기 
        
        const data = await prisma.vocalPortfolio.update({
            data: {
                portfolioFile: audioKey,
                portfolioImage: imageKey,
                title: portfolioDTO.title,
                category: convertCategory(portfolioDTO.category),
                keyword: portfolioDTO.keyword,
                duration: await getAudioDurationInSeconds(audioSignedURL as string),
                content: portfolioDTO.content,
            },
            where: {
                vocalPortfolio: {
                    id: portfolioId,
                    vocalId: userId,
                },
            },
            select: {
                id: true,
                vocalId: true,
            },
        });

        return data;

    } catch(error) {

        throw error;

    }

};


export default updateVocalPortfolioById;