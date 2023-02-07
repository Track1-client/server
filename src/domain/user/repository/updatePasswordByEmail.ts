import prisma from '../../../global/config/prismaClient';
import { NewPasswordDTO } from '../interfaces';

//! producer 비밀번호 업데이트
const updateProducerPassword = async(profileDTO: NewPasswordDTO, password: string) => {
    try {
        const data = await prisma.producer.update({
            data: {
                producerPW: password,
            },
            where: {
                producerID: profileDTO.userEmail
            },
            select: {
                id: true,
                producerID: true,
                name: true,
            },
        });

        return data;
    } catch(error) {
        throw error;
    }
};

//! vocal 비밀번호 업데이트 
const updateVocalPassword = async(profileDTO: NewPasswordDTO, password: string) => {
    try {
        const data = await prisma.vocal.update({
            data: {
                vocalPW: password,
            },
            where: {
                vocalID: profileDTO.userEmail
            },
            select: {
                id: true,
                vocalID: true,
                name: true,
            },
        });

        return data;
    } catch(error) {
        throw error;
    }
};

const updatePassword = {
    updateProducerPassword,
    updateVocalPassword,
};

export default updatePassword;

