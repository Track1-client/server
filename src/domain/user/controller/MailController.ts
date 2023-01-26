import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import { EmailDTO, VerifyCodeDTO } from '../interfaces';
import EmailService from '../service/MailService';

const postAuthMail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const emailDTO: EmailDTO = req.body;
        await EmailService.isEmailExists(emailDTO);  //& 이메일 중복 체크 

        const data = await EmailService.createTempUser(emailDTO);
        
        return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_VERIFICATION_CODE_SUCCESS, data));
    } catch(error) {  
        return next(error);
    }
};

const repostAuthMail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const emailDTO: EmailDTO = req.body;

        const data = await EmailService.updateAuthCode(emailDTO);
        return res.status(sc.CREATED).send(success(sc.CREATED, rm.RECREATE_VERIFICATION_CODE_SUCCESS, data));
    } catch(error) {  
        return next(error);
    }
};

const verifyCode = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const verifyCodeDTO: VerifyCodeDTO = req.body;

        const data = await EmailService.checkVerify(verifyCodeDTO);
        return res.status(sc.ACCEPTED).send(success(sc.ACCEPTED, rm.CODE_VERIFY_SUCCESS, data));
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
    postAuthMail,
    repostAuthMail,
    verifyCode,
    getNewPasswordMail,
};

export default MailController;