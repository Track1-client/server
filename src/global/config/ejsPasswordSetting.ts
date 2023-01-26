import ejs from 'ejs';

const ejsPasswordSetting = (endPoint: string) => {
    let passwordEmailForm;
    //! for redirection
    const clientAddr = 'https://www.track1.site' || 'https://localhost:3000';

    ejs.renderFile(
        __dirname + '/template/newPasswordMail.ejs', 
        { clientAddr, endPoint }, 
        (err, data) => {
            if (err) console.log(err);
            passwordEmailForm = data;
    });

    return passwordEmailForm;
};

export default ejsPasswordSetting;