import prisma from '../../../global/config/prismaClient';
import convertCategory from '../../../global/modules/convertCategory';
import { UserUpdateDTO } from '../interfaces';

//! producer 프로필 업데이트
const updateProducerProfile = async(profileDTO: UserUpdateDTO) => {
    try {
        const category = convertCategory(profileDTO.category);
        const profile = await prisma.producer.update({
            data: {
                contact: profileDTO.contact,
                category: category,
                keyword: profileDTO.keyword,
                introduce: profileDTO.introduce,
            },
            select: {
                id: true,
                name: true,
                producerID: true,
            },
            where: {
                id: profileDTO.userId
            }
        });

        return profile;
    } catch(error) {
        throw error;
    }
};

//! vocal 프로필 업데이트 
const updateVocalProfile = async(profileDTO: UserUpdateDTO) => {
    try {
        const category = await convertCategory(profileDTO.category);
        
        const profile = await prisma.vocal.update({
            data: {
                contact: profileDTO.contact,
                category: category,
                keyword: profileDTO.keyword,
                introduce: profileDTO.introduce,
            },
            select: {
                id: true,
                name: true,
                vocalID: true,
            },
            where: {
                id: profileDTO.userId
            }
        });

        return profile;
    } catch(error) {
        throw error;
    }
};

const updateUserProfile = {
    updateProducerProfile,
    updateVocalProfile,
};

export default updateUserProfile;

