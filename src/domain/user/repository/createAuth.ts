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
            select: {
                userId: true,
                userEmail: true,
                tableName: true,
                token: true,
            }
        });

        return data;
    } catch(error) {
        throw error;
    }
};

export default createAuth;