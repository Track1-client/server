import prisma from '../../../global/config/prismaClient';


const deleteEveryAuth = async(tableName: string, id: number) => {

    try {

        await prisma.auth.deleteMany({

            where: {
                tableName,
                userId: id
            }

        });

    } catch(error) {

        throw error;

    }

};


export default deleteEveryAuth;