import { ProducerProfileUpdateDTO } from '../interfaces';
import prisma from '../../../global/config/prismaClient';
import convertCategory from '../../../global/modules/convertCategory';

const updateProducerProfileByUserId = async(userId: number, profileDTO: ProducerProfileUpdateDTO, imageFileKey: string) => {
    try {
        const result = await prisma.producer.update({
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

        return result;
    } catch (error) {
        throw error;
    }
};

export default updateProducerProfileByUserId;