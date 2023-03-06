import { Auth } from '@prisma/client';
import ejsPasswordSetting from '../config/ejsPasswordSetting';
import smtpTransport from '../config/mailClient';
import { rm } from '../constants';
import { SendResetPassword } from '../middlewares/error/errorInstance';

const sendPasswordResetMail = async(auth: Auth, image: string) => {
    try {
        const endpoint = '/resetPassword';   //! *********** TO-DO 클라이언트 endpoint 작성하기 ***********

        await smtpTransport.sendMail({
            from: {
                name: 'Track-1',
                address: 'admin@track-1.link'
            },
            to: auth.userEmail,
            subject: 'Request to reset your Track-1 password',
            html: ejsPasswordSetting(auth.token, image, endpoint)
        });

        smtpTransport.close();
    } catch(error) {
        throw new SendResetPassword(rm.PASSWORD_RESET_MAIL_SEND_FAIL);
    }
};

export default sendPasswordResetMail;