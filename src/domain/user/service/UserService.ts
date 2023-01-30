import bcrypt from "bcryptjs";
import { rm } from '../../../global/constants';
import { IncorrectLoginPassword, LoginIDNonExists } from '../../../global/middlewares/error/errorInstance';
import { CheckDuplicateNameDTO, CheckNameResultDTO, SignInDTO, SignInResultDTO } from '../interfaces';
import { getUserByLoginID, getUserByName } from '../repository';

const userLogin = async(logInDTO: SignInDTO): Promise<SignInResultDTO> => {
    try {
        const producer = await getUserByLoginID.producerLogin(logInDTO);
        const vocal = await getUserByLoginID.vocalLogin(logInDTO);

        const user = producer || vocal;
        if (!user) throw new LoginIDNonExists(rm.INVALID_ID);  //! 존재하지 않는 ID
        
        const tableName = (producer) ? 'producer':'vocal';
        const userPW = producer?.producerPW || vocal?.vocalPW; 

        const isMatch = await bcrypt.compare(logInDTO.PW, userPW as string);
        if (!isMatch) throw new IncorrectLoginPassword(rm.INCORRECT_PASSWORD);
        
        const redisKeyArray: string[] = ['Table', tableName, 'UserID', user.id as unknown as string]
        const result: SignInResultDTO = {
            tableName: tableName,
            userId: user.id,
            redisKey: redisKeyArray.join(':'),   //* Table:vocal:UserId:1 의 형태로 반환 
        };

        return result;
    } catch (error) {
        throw error;
    }
};

const checkName = async(checkDTO: CheckDuplicateNameDTO) => {
    try {
        const data = (checkDTO.tableName === 'producer') ?
                            await getUserByName.producerNameExists(checkDTO.name) :
                            await getUserByName.vocalNameExists(checkDTO.name);

        const result: CheckNameResultDTO = {
            isDuplicate: data,
            name: checkDTO.name
        }
        return result;
    } catch (error) {
        throw error;
    }
};

const UserService = {
    userLogin,
    checkName,
};

export default UserService;