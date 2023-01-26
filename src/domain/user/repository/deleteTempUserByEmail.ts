import prisma from '../../../global/config/prismaClient';

const deleteTempUserByEmail = async(tableName: string, userEmail: string) => {
    try {
        await prisma.tempUser.delete({
            where: {
                tableEmail: {
                    tableName,
                    userEmail
                },
            },
        });
    } catch(error) {
        throw error;
    }
};

export default deleteTempUserByEmail;