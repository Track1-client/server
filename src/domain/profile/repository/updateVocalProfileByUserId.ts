import { VocalProfileUpdateReturnDTO, VocalProfileUpdateDTO } from '../interfaces';
import prisma from '../../../global/config/prismaClient';
import convertCategory from '../../../global/modules/convertCategory';
import config from '../../../global/config';
import { getS3OneImageObject } from '../../../global/modules/S3Object/get';


function objectParams_url(imageKey: string) {

    return {

        Bucket: config.profileImageBucketName,
        Key: imageKey

    };

};


const updateVocalProfileByUserId = async(userId: number, profileDTO: VocalProfileUpdateDTO, imageFileKey: string) => {

    try {

        const isSelected = ( profileDTO.isSelected === 'true' ) ? true : false;

        const data = await prisma.vocal.update({
            data: {
                name: profileDTO.name,
                category: convertCategory(profileDTO.category),
                keyword: profileDTO.keyword,
                introduce: profileDTO.introduce,
                vocalImage: imageFileKey,
                isSelected: isSelected,
            },
            where: { id: userId },
            select: {
                id: true,
                name: true,
                vocalID: true,
                vocalImage: true,
            },
        });
        
        const profileImage = (data.vocalImage === config.defaultUserProfileImage) ?
                                config.defaultUserProfileImage : await getS3OneImageObject(objectParams_url(data.vocalImage));
        
        const result: VocalProfileUpdateReturnDTO = {

            name: data.name,
            tableName: 'vocal',
            id: data.id as number,
            userId: data.vocalID,
            profileImage: profileImage as string

        };

        return result;

    } catch (error) {

        throw error;

    }

};


export default updateVocalProfileByUserId;