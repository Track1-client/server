import { InvalidVocal } from '../../../global/middlewares/error/errorInstance';
import config from '../../../global/config';
import prisma from '../../../global/config/prismaClient';
import { PortfolioDTO, VocalProfileDTO } from '../interfaces';
import { rm } from '../../../global/constants';
import { getS3OneBeatObject, getS3OneImageObject } from '../../../global/modules/S3Object/get';
import { vocalTitleAsPortfolioDTO } from '.';


function objectParams_url(bucketName: string, fileKey: string) {

    return {

        Bucket: bucketName,
        Key: fileKey

    };

};


const findVocalProfileById = async(vocalId: number, limit: number, page: number) => {

    try {

        const data = await prisma.vocal
            .findUnique({
                select: {
                    id: true, vocalImage: true, name: true, contact: true, category: true, keyword: true, introduce: true, isSelected: true,
                    VocalPortfolio: {
                        select: { id: true, portfolioFile: true, portfolioImage: true, title: true, content: true, keyword: true, category: true, duration: true },
                        orderBy: { createdAt: 'desc' },
                        where: { isTitle: false },
                        skip: (page-1)*limit,
                        take: limit,
                    },
                },
                where: { id: vocalId }
            })
            .then(async (vocal) => {

                if (!vocal) throw new InvalidVocal(rm.INVALID_VOCAL);

                const profileImage = (vocal.vocalImage === config.defaultUserProfileImage) ?
                                        config.defaultUserProfileImage : await getS3OneImageObject(objectParams_url(config.profileImageBucketName, vocal.vocalImage));

                const profileDTO: VocalProfileDTO = {

                    id: vocal.id,
                    profileImage: profileImage as string,
                    name: vocal.name,
                    contact: vocal.contact as string,
                    category: vocal.category,
                    keyword: vocal.keyword,
                    introduce: vocal.introduce as string,
                    isSelected: vocal.isSelected

                };

                let portfolioList: any[] = [];
                const vocalTitle = await vocalTitleAsPortfolioDTO(vocalId);

                if (vocal.VocalPortfolio.length === 0 && vocalTitle === undefined) return { profileDTO , portfolioList }; //! 타이틀만 있는 경우 

                portfolioList = await Promise.all(vocal.VocalPortfolio.map(async (portfolio) => {
                    
                    const beatURL = await getS3OneBeatObject(objectParams_url(config.vocalPortfolioBucketName, portfolio.portfolioFile));
                    const imageURL = (portfolio.portfolioImage === config.defaultVocalPortfolioImage) ? 
                                        portfolio.portfolioImage : 
                                        await getS3OneImageObject(objectParams_url(config.vocalPortfolioBucketName, portfolio.portfolioImage));

                    const portfolioDTO: PortfolioDTO = {

                        id: portfolio.id,
                        jacketImage: imageURL as string,
                        beatWavFile: beatURL as string,
                        title: portfolio.title,
                        content: portfolio.content as string,
                        keyword: portfolio.keyword,
                        category: portfolio.category[0] as string,
                        wavFileLength: portfolio.duration

                    }

                    return portfolioDTO;

                }));

                portfolioList.unshift(vocalTitle);  //! 포트폴리오배열 [0]에 타이틀 넣기 

                return { profileDTO, portfolioList };
            });

        return data;

    } catch (error) {

        throw error;

    }

};


export default findVocalProfileById;