import ejs from 'ejs';


const ejsAuthCode = (authCode: string, image: string) => {

    let authEmailForm;

    ejs.renderFile(
        __dirname + '/template/authMail.ejs', 
        { authCode, image }, 
        (err, data) => {
            if (err) console.log(err);
            authEmailForm = data;
    });

    return authEmailForm;
    
};


export default ejsAuthCode;