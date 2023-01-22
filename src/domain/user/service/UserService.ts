import bcrypt from "bcryptjs";
import { rm } from '../../../global/constants';
import { IncorrectLoginPassword, LoginIDNonExists } from '../../../global/middlewares/error/errorInstance';
import { LogInDTO, LogInResultDTO } from '../interfaces';
import { getUserByLoginID } from '../repository';

const userLogin = async(logInDTO: LogInDTO): Promise<LogInResultDTO> => {
    try {
        const producer = await getUserByLoginID.producerLogin(logInDTO);
        const vocal = await getUserByLoginID.vocalLogin(logInDTO);

        const user = producer || vocal;
        if (!user) throw new LoginIDNonExists(rm.INVALID_ID);  //! 존재하지 않는 ID
        
        const tableName = (producer) ? 'producer':'vocal';
        const userPW = producer?.producerPW || vocal?.vocalPW; 

        const isMatch = await bcrypt.compare(logInDTO.PW, userPW as string);
        if (!isMatch) throw new IncorrectLoginPassword(rm.INCORRECT_PASSWORD);
        
        const result: LogInResultDTO = {
            tableName: tableName,
            userId: user.id
        };
        return result;
    } catch (error) {
        throw error;
    }
};


const UserService = {
    userLogin,
};

export default UserService;