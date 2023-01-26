import ejsAuthCode from '../config/ejsAuthCodeSetting';
import smtpTransport from '../config/mailClient';

const sendAuthCodeMail = async(userEmail: string, authCode: string) => {
    try {
        await smtpTransport.sendMail({
            from: 'admin@track-1.link',
            to: userEmail,
            subject: 'Verify your email address to sign up for Track-1',
            html: ejsAuthCode(authCode)
        });

        smtpTransport.close();
    } catch(error) {
        throw error;
    }
};

export default sendAuthCodeMail;