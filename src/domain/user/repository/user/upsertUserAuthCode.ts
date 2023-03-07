import prisma from '../../../../global/config/prismaClient';
import { EmailDTO } from '../../interfaces';


const upsertCodeInTempUser = async(emailDTO: EmailDTO, authCode: string) => {

    try {

        const data = await prisma.tempUser.upsert({

            where: {
                tableEmail: {
                    tableName: emailDTO.tableName,
                    userEmail: emailDTO.userEmail,
                }
            },
            create: {
                tableName: emailDTO.tableName,
                userEmail: emailDTO.userEmail,
                authCode
            },
            update: { authCode }
            
        });
        
        return data;

    } catch(error) {

        throw error;

    }

};


export default upsertCodeInTempUser;