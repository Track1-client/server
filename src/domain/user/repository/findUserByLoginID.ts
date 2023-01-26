import prisma from '../../../global/config/prismaClient';
import UserLogInDTO from '../interfaces/SignInDTO';

const producerLogin = async(producerLoginDTO: UserLogInDTO) => {
    try {
        const producer = await prisma.producer.findFirst({
            where: {
                producerID: {
                    equals: producerLoginDTO.ID,
                },
            },
        });
        
        return producer;
    } catch(error) {
        throw error;
    }
};

const vocalLogin = async(vocalLoginDTO: UserLogInDTO) => {
    try {
        const vocal = await prisma.vocal.findFirst({
            where: {
                vocalID: {
                    equals: vocalLoginDTO.ID,
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