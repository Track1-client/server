import ejs from 'ejs';


const ejsPasswordSetting = (token: string, image: string, endpoint: string) => {

    let passwordEmailForm;
    //! for redirection
    const clientAddr = 'https://www.track1.site';

    ejs.renderFile(
        __dirname + '/template/newPasswordMail.ejs', 
        { clientAddr, token, image, endpoint }, 
        (err, data) => {
            if (err) console.log(err);
            passwordEmailForm = data;
    });

    return passwordEmailForm;

};


export default ejsPasswordSetting;