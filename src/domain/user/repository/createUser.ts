import prisma from '../../../global/config/prismaClient';
import convertCategory from '../../../global/modules/convertCategory';
import { ProducerCreateDTO, VocalCreateDTO } from '../interfaces';

const createProducer = async(producer: ProducerCreateDTO, location: string) => {
    try {
        const categ = await convertCategory(producer.category);

        const result = await prisma.producer.create({
            data: {
                producerID: producer.ID,
                producerPW: producer.PW,
                name: producer.name,
                contact: producer.contact,
                category: categ,
                keyword: producer.keyword,
                introduce: producer.introduce,
                producerImage: location,
            },
            select: {
                id: true,
                producerID: true,
                name: true
            },
        });
    
        return result;
    } catch (error) {
        throw error;
    }
};

const createVocal = async(vocal: VocalCreateDTO, location: string) => {
    try {
        const categ = await convertCategory(vocal.category);

        const result = await prisma.vocal.create({
            data: {
                vocalID: vocal.ID,
                vocalPW: vocal.PW,
                name: vocal.name,
                contact: vocal.contact,
                isSelected: vocal.isSelected,
                category: categ,
                keyword: vocal.keyword,
                introduce: vocal.introduce,
                vocalImage: location,
            },
            select: {
                id: true,
                vocalID: true,
                name: true
            },
        }); 

        return result;
    } catch (error) {
        throw error;
    }
};

const createUser = {
    createProducer,
    createVocal,
};

export default createUser;