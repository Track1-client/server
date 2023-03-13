import config from '../../../global/config';
import prisma from '../../../global/config/prismaClient';
import { getS3OneBeatObject, getS3OneImageObject } from '../../../global/modules/S3Object/get';
import { FilteringReturnDTO } from '../interfaces';


function objectParams_url(bucketName: string, audioKey: string) {

    return {

        Bucket: bucketName,
        Key: audioKey

    };

};


const findVocals = async(condition: any, page: number, limit: number) => {

    try {

        //! 작업물 최신순 정렬
        const dataList = await prisma.vocalOrder
            .findMany({

                select: {
                    Vocal: {
                        select: { 
                                    id: true, vocalImage: true, name: true, category: true, keyword: true, isSelected: true,
                                    VocalPortfolio: {
                                        select: { portfolioFile: true, id: true, duration: true },
                                        where: { isTitle: true }
                                    }  
                                }
                    }
                },
                where: { Vocal: condition },
                orderBy: { updatedAt: "desc" }, //~ 최신순 정렬 
                //distinct: ['vocalId'],  //~ 인덱스 0의(최신의) vocalId를 기준으로 부터 중복된 vocalId는 가져오지 않음. 
                skip: (page-1)*limit,
                take: limit

            })
            .then(async (vocalList) => {

                return await Promise.all(vocalList.map(async (vocal) => {

                        const getVocal = vocal.Vocal;
                        const categNum = (getVocal.category.length - 1 < 0) ? 0 : getVocal.category.length - 1;

                        let titleURL = '';
                        let duration = 0;

                        //! 보컬이 아직 포트폴리오를 올리지 않아서 타이틀이 존재하지 않는 경우 예외처리 
                        if (getVocal.VocalPortfolio.length !== 0) {

                                titleURL = await getS3OneBeatObject(objectParams_url(config.vocalPortfolioBucketName, getVocal.VocalPortfolio[0].portfolioFile)) as string;
                                duration = getVocal.VocalPortfolio[0].duration;

                        };

                        const profileImage = (getVocal.vocalImage === config.defaultUserProfileImage) ?
                                        config.defaultUserProfileImage : await getS3OneImageObject(objectParams_url(config.profileImageBucketName, getVocal.vocalImage));


                        const returnDTO: FilteringReturnDTO = {

                            vocalId: getVocal.id,
                            vocalProfileImage: profileImage as string,
                            vocalTitleFile: titleURL,
                            vocalName: getVocal.name,
                            category: getVocal.category,
                            keyword: getVocal.keyword,
                            totalCategNum: categNum,
                            wavFileLength: duration,
                            isSelected: getVocal.isSelected

                        }

                        return returnDTO;

                    }));
            });

        return dataList;

    } catch(error) {

        throw error;

    }

};


export default findVocals;