import ejs from 'ejs';

const ejsAuthCode = (authCode: string) => {
    let authEmailForm;

    ejs.renderFile(
        __dirname + '/template/authMail.ejs', 
        { authCode }, 
        (err, data) => {
            if (err) console.log(err);
            authEmailForm = data;
    });

    return authEmailForm;
};

export default ejsAuthCode;