import prisma from '../../../global/config/prismaClient';

const createAuth = async(userId: number, tableName: string, userEmail: string, token: string) => {
    try {
        const data = await prisma.auth.create({
            data: {
                userId,
                tableName,
                userEmail,
                token,
            },
        });

        return data;
    } catch(error) {
        throw error;
    }
};

export default createAuth;