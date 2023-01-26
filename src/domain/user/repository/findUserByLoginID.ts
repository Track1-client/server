import prisma from '../../../global/config/prismaClient';
import UserLogInDTO from '../interfaces/SignInDTO';

const producerLogin = async(producerLoginDTO: UserLogInDTO) => {
    const producer = await prisma.producer.findFirst({
        where: {
            producerID: {
                equals: producerLoginDTO.ID,
            },
        },
    });
    
    return producer;
};

const vocalLogin = async(vocalLoginDTO: UserLogInDTO) => {
    const vocal = await prisma.vocal.findFirst({
        where: {
            vocalID: {
                equals: vocalLoginDTO.ID,
            },
        },
    });

    return vocal;
};

const getUserByLoginID = {
    producerLogin,
    vocalLogin,
};

export default getUserByLoginID;