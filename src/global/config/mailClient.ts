import nodemailer from 'nodemailer';
import config from '.';
var smtp = require('nodemailer-smtp-transport');


const smtpTransport = nodemailer.createTransport(smtp({

        host: 'smtp.daum.net',
        port: 465,
        secure: true,
        auth: {
            user: config.mailUser,
            pass: config.mailPassword
        },
        tls: { rejectUnauthorized: false }
        
    }));


export default smtpTransport;

