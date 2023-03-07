import prisma from '../../../../global/config/prismaClient';


const findTempUserByEmail = async(tableName: string, userEmail: string) => {

    try {

        const authCode = await prisma.tempUser.findUnique({

            where: {
                tableEmail: {
                    userEmail,
                    tableName
                }
            },
            select: { authCode: true }

        });
        
        return authCode;

    } catch(error) {

        throw error;

    }

};


export default findTempUserByEmail;