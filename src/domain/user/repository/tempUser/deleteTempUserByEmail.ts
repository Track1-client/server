import { Prisma } from '@prisma/client';
import { rm } from '../../../../global/constants';
import { SendAuthCode } from '../../../../global/middlewares/error/errorInstance';


const deleteTempUserByEmail = async(tableName: string, userEmail: string, transaction: Prisma.TransactionClient) => {

    try {

        await transaction.tempUser.delete({

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