import prisma from '../../../global/config/prismaClient';
import { rm } from '../../../global/constants';
import { SendAuthCode } from '../../../global/middlewares/error/errorInstance';


const deleteTempUserByEmail = async(tableName: string, userEmail: string) => {

    try {

        await prisma.tempUser.delete({

            where: {
                tableEmail: {
                    tableName,
                    userEmail
                }
            }

        });

    } catch(error) {

        throw new SendAuthCode(rm.SEND_VERIFY_MAIL_FIRST)

    }

};


export default deleteTempUserByEmail;