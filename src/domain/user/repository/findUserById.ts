import prisma from '../../../global/config/prismaClient';
import UserLogInDTO from '../interfaces/SignInDTO';

const producer = async(id: number) => {
    try {
        const producer = await prisma.producer.findFirst({
            where: {
                id
            },
        });
        
        return producer;
    } catch(error) {
        throw error;
    }
};

const vocal = async(id: number) => {
    try {
        const vocal = await prisma.vocal.findFirst({
            where: {
                id
            },
        });
    
        return vocal;
    } catch(error) {
        throw error;
    }
};

const getUserById = {
    producer,
    vocal
};

export default getUserById;