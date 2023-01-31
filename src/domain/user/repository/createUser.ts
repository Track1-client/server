import prisma from '../../../global/config/prismaClient';
import convertCategory from '../../../global/modules/convertCategory';
import { ProducerCreateDTO } from '../interfaces';

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
                producerImage: location
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

const createVocal = async() => {

};

const createUser = {
    createProducer,
    createVocal,
};

export default createUser;