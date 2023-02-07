import prisma from '../../../global/config/prismaClient';

//! producer 중복 확인 
const producerEmailExists = async(userEmail: string) => {
    try {
        const producer = await prisma.producer.findFirst({
            where: {
                producerID: {
                    equals: userEmail,
                },
            },
        });
        
        const result = (!producer) ? false : true;
        return result;
    } catch(error) {
        throw error;
    }
};

//! vocal email 중복 확인 
const vocalEmailExists = async(userEmail: string) => {
    try {
        const vocal = await prisma.vocal.findFirst({
            where: {
                vocalID: {
                    equals: userEmail,
                },
            },
        });
    
        const result = (!vocal) ? false : true;
        return result;
    } catch(error) {
        throw error;
    }
};

const getUserByEmail = {
    producerEmailExists,
    vocalEmailExists,
};

export default getUserByEmail;

