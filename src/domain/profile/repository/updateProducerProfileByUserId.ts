import { ProducerProfileUpdateDTO, ProducerProfileUpdateReturnDTO } from '../interfaces';
import prisma from '../../../global/config/prismaClient';
import convertCategory from '../../../global/modules/convertCategory';
import config from '../../../global/config';
import { getS3OneImageObject } from '../../../global/modules/S3Object/get';

function objectParams_url(imageKey: string) {
    return {
        Bucket: config.profileImageBucketName,
        Key: imageKey,
    };
};

const updateProducerProfileByUserId = async(userId: number, profileDTO: ProducerProfileUpdateDTO, imageFileKey: string) => {
    try {
        const data = await prisma.producer.update({
            data: {
                name: profileDTO.name,
                category: convertCategory(profileDTO.category),
                keyword: profileDTO.keyword,
                introduce: profileDTO.introduce,
                producerImage: imageFileKey,
            },
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                producerID: true,
                producerImage: true,
            },
        });
        
        const profileImage = (data.producerImage === config.defaultUserProfileImage) ?
                                config.defaultUserProfileImage : await getS3OneImageObject(objectParams_url(data.producerImage));
        
        const result: ProducerProfileUpdateReturnDTO = {
            name: data.name,
            tableName: 'producer',
            id: data.id as number,
            userId: data.producerID,
            profileImage: profileImage as string,
        };

        return result;
    } catch (error) {
        throw error;
    }
};

export default updateProducerProfileByUserId;