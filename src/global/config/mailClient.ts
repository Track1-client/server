import nodemailer from 'nodemailer';
import config from '.';

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.daum.net',
    port: 465,
    secure: true,
    auth: {
        user: config.mailUser,
        pass: config.mailPassword
    },
    // tls: {
    //     rejectUnauthorized: false,
    // },
});


export default smtpTransport;