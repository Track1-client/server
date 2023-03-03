import { InvalidProducer } from './../../../global/middlewares/error/errorInstance';
import config from '../../../global/config';
import prisma from '../../../global/config/prismaClient';
import { PortfolioDTO, ProducerProfileDTO } from '../interfaces';
import { rm } from '../../../global/constants';
import { getS3OneBeatObject, getS3OneImageObject } from '../../../global/modules/S3Object/get';
import { producerTitleAsPortfolioDTO } from '.';

function objectParams_url(bucketName: string, fileKey: string) {
    return {
        Bucket: bucketName,
        Key: fileKey,
    };
};

const findProducerProfileById = async(producerId: number, limit: number, page: number) => {
    try {
        const data = await prisma.producer
            .findUnique({
                select: {
                    id: true, producerImage: true, name: true, contact: true, category: true, keyword: true, introduce: true,
                    ProducerPortfolio: {
                        select: { id: true, portfolioFile: true, portfolioImage: true, title: true, content: true, keyword: true, category: true, duration: true },
                        orderBy: { createdAt: 'desc' },
                        where: { isTitle: false },
                        skip: (page-1)*limit,
                        take: limit,
                    },
                },
                where: { id: producerId },
            })
            .then(async (producer) => {
                if (!producer) throw new InvalidProducer(rm.INVALID_PRODUCER);

                const profileImage = (producer.producerImage === config.defaultUserProfileImage) ?
                                        config.defaultUserProfileImage : await getS3OneImageObject(objectParams_url(config.profileImageBucketName, producer.producerImage));

                //! 프로필 데이터
                const profileDTO: ProducerProfileDTO = {
                    id: producer.id,
                    profileImage: profileImage as string,
                    name: producer.name,
                    contact: producer.contact as string,
                    category: producer.category,
                    keyword: producer.keyword,
                    introduce: producer.introduce as string,
                };


                let portfolioList: any[] = [];
                const producerTitle = await producerTitleAsPortfolioDTO(producerId);
                if (producer.ProducerPortfolio.length === 0 && producerTitle === undefined) return { profileDTO , portfolioList }; //! 타이틀만 있는 경우 
                
                //! 포트폴리오 데이터 리스트 
                portfolioList = await Promise.all(producer.ProducerPortfolio.map(async (portfolio) => {
                    const beatURL = await getS3OneBeatObject(objectParams_url(config.producerPortfolioBucketName, portfolio.portfolioFile));
                    const imageURL = (portfolio.portfolioImage === config.defaultJacketAndProducerPortfolioImage) ? 
                                        portfolio.portfolioImage : 
                                        await getS3OneImageObject(objectParams_url(config.producerPortfolioBucketName, portfolio.portfolioImage));

                    const portfolioDTO: PortfolioDTO = {
                        id: portfolio.id,
                        jacketImage: imageURL as string,
                        beatWavFile: beatURL as string,
                        title: portfolio.title,
                        content: portfolio.content as string,
                        keyword: portfolio.keyword,
                        category: portfolio.category[0] as string,
                        wavFileLength: portfolio.duration,
                    }
                    return portfolioDTO;
                }));

                portfolioList.unshift(producerTitle);  //! 포트폴리오배열 [0]에 타이틀 넣기 

                return { profileDTO, portfolioList };
            });

        return data;
    } catch (error) {
        throw error;
    }
};

export default findProducerProfileById;