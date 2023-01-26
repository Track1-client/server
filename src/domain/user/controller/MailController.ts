import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import { EmailDTO } from '../interfaces';
import EmailService from '../service/MailService';

const getAuthMail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const emailDTO: EmailDTO = req.body;
        await EmailService.isEmailExists(emailDTO);  //& 이메일 중복 체크 

        



    } catch(error) {  
        return next(error);
    }
};

const getNewPasswordMail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch(error) {  
        return next(error);
    }
};


const MailController = {
    getAuthMail,
    getNewPasswordMail,
};

export default MailController;