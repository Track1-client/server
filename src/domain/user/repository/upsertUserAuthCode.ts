import prisma from '../../../global/config/prismaClient';
import { EmailDTO } from '../interfaces';

const upsertCodeInTempUser = async(emailDTO: EmailDTO, authCode: string) => {
    try {
        //! setTimeOut으로 30분 지나면 데이터 삭제되기 때문에, upsert이용해 create 또는 update 시키기 
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
            update: {
                authCode
            },
        });
        
        return data;
    } catch(error) {
        throw error;
    }
};

export default upsertCodeInTempUser;