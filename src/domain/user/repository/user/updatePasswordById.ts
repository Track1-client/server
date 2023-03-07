import prisma from '../../../../global/config/prismaClient';


//! producer 비밀번호 업데이트
const updateProducerPassword = async(userId: number, password: string) => {

    try {

        const data = await prisma.producer.update({

            data: { producerPW: password },
            where: { id: userId },
            select: {
                id: true,
                producerID: true,
                name: true,
            }

        });

        return data;

    } catch(error) {

        throw error;

    }

};


//! vocal 비밀번호 업데이트 
const updateVocalPassword = async(userId: number, password: string) => {

    try {

        const data = await prisma.vocal.update({

            data: { vocalPW: password },
            where: { id: userId },
            select: {
                id: true,
                vocalID: true,
                name: true,
            }
            
        });

        return data;

    } catch(error) {

        throw error;

    }

};


const updatePassword = {

    updateProducerPassword,
    updateVocalPassword

};


export default updatePassword;

