import prisma from '../../../global/config/prismaClient';
import UserLogInDTO from '../interfaces/SignInDTO';

const producerLogin = async(userEmail: string) => {
    try {
        const producer = await prisma.producer.findFirst({
            where: {
                producerID: {
                    equals: userEmail,
                },
            },
        });
        
        return producer;
    } catch(error) {
        throw error;
    }
};

const vocalLogin = async(userEmail: string) => {
    try {
        const vocal = await prisma.vocal.findFirst({
            where: {
                vocalID: {
                    equals: userEmail,
                },
            },
        });
    
        return vocal;
    } catch(error) {
        throw error;
    }
};

const getUserByLoginID = {
    producerLogin,
    vocalLogin,
};

export default getUserByLoginID;