import prisma from '../../../global/config/prismaClient';
import { ProducerCreateDTO, VocalCreateDTO } from '../interfaces';

const createProducer = async(producer: ProducerCreateDTO, password: string, location: string) => {
    try {
        const isAgree = (producer.isAgree === 'true');
        const result = await prisma.producer.create({
            data: {
                producerID: producer.ID,
                producerPW: password,
                name: producer.name,
                producerImage: location,
                isAgree,
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

const createVocal = async(vocal: VocalCreateDTO, password: string, location: string) => {
    try {
        const isAgree = (vocal.isAgree === 'true');
        const result = await prisma.vocal.create({
            data: {
                vocalID: vocal.ID,
                vocalPW: password,
                name: vocal.name,
                vocalImage: location,
                isAgree,
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