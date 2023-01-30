import bcrypt from "bcryptjs";
import { rm } from '../../../global/constants';
import { IncorrectLoginPassword, LoginIDNonExists } from '../../../global/middlewares/error/errorInstance';
import { CheckNameResultDTO, SignInDTO, SignInResultDTO } from '../interfaces';
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

const checkName = async(userName: string, tableName: string) => {
    try {
        /**  producer, vocal 내에서 검사하는 경우 
        const data = (tableName === 'producer') ?
                            await getUserByName.producerNameExists(userName) :
                            await getUserByName.vocalNameExists(userName);
        */

        const producer = await getUserByName.producerNameExists(userName);
        const vocal = await getUserByName.vocalNameExists(userName);
        const data = producer || vocal;   //! producer, vocal 테이블 합쳐서 중복검사 

        const result: CheckNameResultDTO = {
            isDuplicate: data,
            name: userName
        };
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