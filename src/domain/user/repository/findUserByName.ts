import prisma from '../../../global/config/prismaClient';

//! producer 중복 확인 
const producerNameExists = async(userName: string) => {
    try {
        const producer = await prisma.producer.findFirst({
            where: {
                name: {
                    equals: userName,
                },
            },
        });
        
        const result = (!producer) ? false : true;
        return result;
    } catch(error) {
        throw error;
    }
};

//! vocal 중복 확인 
const vocalNameExists = async(userName: string) => {
    try {
        const vocal = await prisma.vocal.findFirst({
            where: {
                name: {
                    equals: userName,
                },
            },
        });
    
        const result = (!vocal) ? false : true;
        return result;
    } catch(error) {
        throw error;
    }
};

const getUserByName = {
    producerNameExists,
    vocalNameExists,
};

export default getUserByName;

