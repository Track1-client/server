import prisma from '../../../global/config/prismaClient';


const deleteEveryAuthByEmail = async(tableName: string, email: string) => {

    try {

        await prisma.auth.deleteMany({

            where: {
                tableName,
                userEmail: email
            }

        });

    } catch(error) {

        throw error;

    }

};


export default deleteEveryAuthByEmail;