import prisma from '../../../global/config/prismaClient';

const findTempUserByEmail = async(tableName: string, userEmail: string) => {
    try {
        const authCode = prisma.tempUser.findUnique({
            where: {
                tableEmail: {
                    tableName,
                    userEmail
                },
            },
            select: {
                authCode: true,
            },
        });
    
        return authCode;
    } catch(error) {
        throw error;
    }
};

export default findTempUserByEmail;