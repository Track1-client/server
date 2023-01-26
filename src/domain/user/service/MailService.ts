import { rm } from '../../../global/constants';
import { AlreadyExistsEmail, SendAuthCode, UpdateAuthCode, ValidAuthTimePassed } from '../../../global/middlewares/error/errorInstance';
import randomAccessCode from '../../../global/modules/getAccessCode';
import sendAuthCodeMail from '../../../global/modules/sendAuthCodeMail';
import { AuthCodeReturnDTO, EmailDTO, VerifyCodeDTO } from '../interfaces';
import { createTempUserTable, deleteTempUserByEmail, findTempUserByEmail, getUserByEmail, upsertCodeInTempUser } from '../repository';

const isEmailExists = async(emailDTO: EmailDTO) => {
    try {
        const result = (emailDTO.tableName === 'producer') ? await getUserByEmail.playerEmailExists : await getUserByEmail.nonPlayerEmailExists;
        if (!result) throw new AlreadyExistsEmail(rm.ALREADY_EXISTS_EMAIL);
    } catch(error) {
        throw error;
    }
};


const createTempUser = async(emailDTO: EmailDTO) => {
    try {
        let authCode = randomAccessCode();
        const tempUser = await createTempUserTable(emailDTO, authCode);
        
        //! TO-DO 메일 보내고 
        sendAuthCodeMail(emailDTO.userEmail, authCode);

        //* 인증시간 30분 지나면 삭제 
        setTimeout(async() => {
            await findTempUserByEmail(emailDTO.tableName, emailDTO.userEmail).then(async(data) => {
                if (data && (data?.authCode === authCode)) {
                    await deleteTempUserByEmail(emailDTO.tableName, emailDTO.userEmail);
                }
            });
        }, 30 * 60 * 1000);
    } catch(error) {
        throw error;
    }
};

const updateAuthCode = async(emailDTO: EmailDTO) => {
    try {
        let newAuthCode: string;
        const oldAuthCode = await findTempUserByEmail(emailDTO.tableName, emailDTO.userEmail) as unknown as string;

        if (!oldAuthCode) throw new SendAuthCode(rm.SEND_VERIFY_MAIL_FIRST);
        //! 원래 코드와 일치하지 않는 인증코드 생성 
        do {
            newAuthCode = randomAccessCode();
            if (newAuthCode !== oldAuthCode) break;
        } while (newAuthCode === oldAuthCode);
        
        const data = await upsertCodeInTempUser(emailDTO, newAuthCode);

        if (!data) throw new UpdateAuthCode(rm.REMKAE_VERIFICATION_CODE_FAIL);

        //! TO-DO 메일 보내고 
        sendAuthCodeMail(emailDTO.userEmail, newAuthCode);

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

    //! 일치하지 않는 경우 (유효기간 지남)
    if (getAuthCode.authCode !== verifyCodeDTO.verificationCode) throw new ValidAuthTimePassed(rm.VALID_AUTH_TIME_PASSED);

    //! 일치하는 경우 삭제시키기 
    await deleteTempUserByEmail(verifyCodeDTO.tableName, verifyCodeDTO.userEmail);
    
    const result: AuthCodeReturnDTO = {
        tableName: verifyCodeDTO.tableName,
        userEmail: verifyCodeDTO.userEmail,
        authCode: getAuthCode as unknown as string,
    };
    return result;
};

const EmailService = {
    isEmailExists,
    createTempUser,
    updateAuthCode,
    checkVerify,
}

export default EmailService;
