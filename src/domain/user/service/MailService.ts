import { rm } from '../../../global/constants';
import { AlreadyExistsEmail } from '../../../global/middlewares/error/errorInstance';
import randomAccessCode from '../../../global/modules/getAccessCode';
import { EmailDTO } from '../interfaces';
import { getUserByEmail } from '../repository';

const isEmailExists = async(emailDto: EmailDTO) => {
    try {
        const result = (emailDto.tableName === 'producer') ?
                        getUserByEmail.playerEmailExists : getUserByEmail.nonPlayerEmailExists;
        if (!result) throw new AlreadyExistsEmail(rm.ALREADY_EXISTS_EMAIL);

        let authCode = randomAccessCode();



    } catch(error) {
        throw error;
    }
};

const EmailService = {
    isEmailExists,
}

export default EmailService;
