import MailDTO from '../interfaces/MailDTO';
import prisma from '../../../global/config/prismaClient';

//! player email 중복 확인 
const playerEmailExists = async(userEmail: string) => {
    try {
        const player = prisma.producer.findFirst({
            where: {
                producerID: {
                    equals: userEmail,
                },
            },
        });
    
        const result = (!player) ? false : true;
        return result;
    } catch(error) {
        throw error;
    }
};

//! non-player email 중복 확인 
const nonPlayerEmailExists = async(userEmail: string) => {
    try {
        const nonPlayer = prisma.vocal.findFirst({
            where: {
                vocalID: {
                    equals: userEmail,
                },
            },
        });
    
        const result = (!nonPlayer) ? false : true;
        return result;
    } catch(error) {
        throw error;
    }
};

const getUserByEmail = {
    playerEmailExists,
    nonPlayerEmailExists,
};

export default getUserByEmail;

