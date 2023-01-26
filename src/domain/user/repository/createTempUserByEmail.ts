import prisma from '../../../global/config/prismaClient';
import { EmailDTO } from '../interfaces';

const createTempUserTable = async(emailDTO: EmailDTO, authCode: string) => {
    try {
        const data = prisma.tempUser.create({
            data: {
                tableName: emailDTO.tableName,
                userEmail: emailDTO.userEmail,
                authCode
            },
        });
    
        return data;
    } catch(error) {
        throw error;
    }
};

export default createTempUserTable;