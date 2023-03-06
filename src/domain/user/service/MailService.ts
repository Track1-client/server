import config from '../../../global/config';
import { rm } from '../../../global/constants';
import { CreateAuth, CreateAuthCode, SendAuthCode, UpdateAuthCode, InvalidVerificationCode } from '../../../global/middlewares/error/errorInstance';
import randomAccessCode from '../../../global/modules/getAccessCode';
import sendAuthCodeMail from '../../../global/modules/sendAuthCodeMail';
import sendPasswordResetMail from '../../../global/modules/sendResetPasswordMail';
import { AuthCodeReturnDTO, EmailDTO, VerifyCodeDTO } from '../interfaces';
import crypto from 'crypto';
import { createAuth, deleteTempUserByEmail, findAuthByToken, findTempUserByEmail, getUserByEmail, upsertCodeInTempUser } from '../repository';

const isEmailExists = async(emailDTO: EmailDTO) => {
    try {
        const result = (emailDTO.tableName === 'producer') ? 
                        await getUserByEmail.producerEmailExists(emailDTO.userEmail) : 
                        await getUserByEmail.vocalEmailExists(emailDTO.userEmail);
        
        const data = (result) ? result : false;
        return data;
    } catch(error) {
        throw error;
    }
};

const createTempUser = async(emailDTO: EmailDTO) => {
    try {
        let authCode = randomAccessCode();
        
        const tempUser = await upsertCodeInTempUser(emailDTO, authCode); 
        if (!tempUser) throw new CreateAuthCode(rm.MAKE_VERIFICATION_CODE_FAIL);

        //! 메일 보내기
        const image = config.track1EmailImage;
        sendAuthCodeMail(emailDTO.userEmail, authCode, image);

        //* 인증시간 30분 지나면 삭제 
        setTimeout(async() => {
            await findTempUserByEmail(emailDTO.tableName, emailDTO.userEmail).then(async(data) => {
                if (data && (data?.authCode === authCode)) {
                    await deleteTempUserByEmail(emailDTO.tableName, emailDTO.userEmail);
                }
            });
        }, 30 * 60 * 1000);

        const result: AuthCodeReturnDTO = {
            tableName: tempUser.tableName,
            userEmail: tempUser.userEmail,
            authCode : tempUser.authCode,
        }

        return result;
    } catch(error) {
        throw error;
    }
};

const updateAuthCode = async(emailDTO: EmailDTO) => {
    try {
        let newAuthCode: string;
        const oldAuthCode = await findTempUserByEmail(emailDTO.tableName, emailDTO.userEmail) as unknown as string;
        
        //! 원래 코드와 일치하지 않는 인증코드 생성 
        do {
            newAuthCode = randomAccessCode();
            if (newAuthCode !== oldAuthCode) break;
        } while (newAuthCode === oldAuthCode);
        
        const data = await upsertCodeInTempUser(emailDTO, newAuthCode);
        if (!data) throw new UpdateAuthCode(rm.REMAKE_VERIFICATION_CODE_FAIL);
        
        //! 메일 보내기 
        const image = config.track1EmailImage;
        sendAuthCodeMail(emailDTO.userEmail, newAuthCode, image);

        //* 인증시간 30분 지나면 삭제 
        setTimeout(async() => {
            await findTempUserByEmail(emailDTO.tableName, emailDTO.userEmail).then(async(data) => {
                if (data && (data?.authCode === newAuthCode)) {
                    await deleteTempUserByEmail(emailDTO.tableName, emailDTO.userEmail);
                }
            });
        }, 30 * 60 * 1000);

        const result: AuthCodeReturnDTO = {
            tableName: data.tableName,
            userEmail: data.userEmail,
            authCode : data.authCode,
        }

        return result;
    } catch(error) {
        throw error;
    }
};

const checkVerify = async(verifyCodeDTO: VerifyCodeDTO) => {
    const getAuthCode = await findTempUserByEmail(verifyCodeDTO.tableName, verifyCodeDTO.userEmail);
    
    if (!getAuthCode) throw new SendAuthCode(rm.SEND_VERIFY_MAIL_FIRST);

    //! 일치하지 않는 경우 (유효시간 지났거나 다른 코드 입력)
    if (getAuthCode.authCode !== verifyCodeDTO.verificationCode) throw new InvalidVerificationCode(rm.INVALID_VERIFICATION_CODE);

    //! 일치하는 경우 tempUser 삭제 로직 -> 회원가입 시 삭제로 변경
    //await deleteTempUserByEmail(verifyCodeDTO.tableName, verifyCodeDTO.userEmail);
    
    const result: AuthCodeReturnDTO = {
        tableName: verifyCodeDTO.tableName,
        userEmail: verifyCodeDTO.userEmail,
        authCode: getAuthCode.authCode as unknown as string,
    };
    return result;
};

//& 비밀번호 재설정 링크 유효시간을 위한 Auth 테이블 생성 
const createAuthTable = async(userId: number, tableName: string, userEmail: string) => {
    try {
        let newToken: string;
        let oldToken: string;

        //! 원래 토큰과 일치하지 않는 토큰 생성 
        do {
            newToken = crypto.randomBytes(20).toString('hex');
            oldToken = await findAuthByToken(newToken) as unknown as string;
            
            if (!oldToken) break;
        } while (oldToken);

        const auth = await createAuth(userId, tableName, userEmail, newToken);
        if (!auth) throw new CreateAuth(rm.FAIL_CREATE_AUTH);

        return auth;
    } catch (error) {
        throw error;
    }
};

//& 비밀번호 재설정 메일 보내기 
const postPasswordMail = async(auth: any) => {
    try {
        //! 메일 보내기
        const image = config.track1EmailImage;
        await sendPasswordResetMail(auth, image);
    } catch (error) {
        throw error;
    }
};

const EmailService = {
    isEmailExists,
    createTempUser,
    updateAuthCode,
    checkVerify,
    postPasswordMail,
    createAuthTable,
}

export default EmailService;
