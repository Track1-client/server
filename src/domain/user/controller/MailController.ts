import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import { AlreadyExistsEmail, UnauthorizedUser } from '../../../global/middlewares/error/errorInstance';
import { EmailDTO, ResendMailDTO, VerifyCodeDTO } from '../interfaces';
import MailDTO from '../interfaces/MailDTO';
import EmailService from '../service/MailService';
import { deleteEveryAuthByEmail, getUserByLoginID } from '../repository';

const postAuthMail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const emailDTO: EmailDTO = req.body;

        const email = await EmailService.isEmailExists(emailDTO);  //& 이메일 중복 체크 
        if (email) throw new AlreadyExistsEmail(rm.ALREADY_EXISTS_EMAIL);

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
        const passwordMailDTO: MailDTO = req.body;

        const data = await EmailService.isEmailExists(passwordMailDTO);  //& 이메일 중복 체크 
        if (!data) throw new UnauthorizedUser(rm.NO_USER);

        const auth = await EmailService.createAuthTable(data.id, passwordMailDTO.tableName, passwordMailDTO.userEmail);  //& 비밀번호 재설정 위한 auth 생성 
        
        await EmailService.postPasswordMail(auth); //& 비밀번호 재설정 메일 보내기 
        return res.status(sc.OK).send(success(sc.OK, rm.PASSWORD_RESET_MAIL_SEND_SUCCESS, auth));
    } catch(error) {  
        return next(error);
    }
};

const getNewPasswordMailAgain = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const passwordMailDTO: ResendMailDTO = req.body;
        
        await deleteEveryAuthByEmail(passwordMailDTO.tableName, passwordMailDTO.userEmail);

        const user = (passwordMailDTO.tableName === 'producer') ? 
                            await getUserByLoginID.producerLogin(passwordMailDTO.userEmail) :
                            await getUserByLoginID.vocalLogin(passwordMailDTO.userEmail);
        if (!user) throw new UnauthorizedUser(rm.NO_USER);

        const auth = await EmailService.createAuthTable(user?.id as unknown as number, passwordMailDTO.tableName, passwordMailDTO.userEmail); 

        await EmailService.postPasswordMail(auth); //& 비밀번호 재설정 메일 보내기 
        return res.status(sc.OK).send(success(sc.OK, rm.PASSWORD_RESET_MAIL_SEND_SUCCESS, auth));
    } catch (error) {
        return next(error);
    }

};

const MailController = {
    postAuthMail,
    repostAuthMail,
    verifyCode,
    getNewPasswordMail,
    getNewPasswordMailAgain,
};

export default MailController;