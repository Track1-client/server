import { ProducerJoinFail, VocalJoinFail } from './../../../global/middlewares/error/errorInstance/user';
import bcrypt from "bcryptjs";
import { rm } from '../../../global/constants';
import { IncorrectLoginPassword, LoginIDNonExists } from '../../../global/middlewares/error/errorInstance';
import { CheckNameResultDTO, ProducerCreateDTO, RefreshAccessTokenDTO, SignInDTO, SignInResultDTO, VocalCreateDTO } from '../interfaces';
import { createUser, getUserByLoginID, getUserByName } from '../repository';
import UserCreateResultDTO from '../interfaces/UserCreateReturnDTO';
import jwtUtils from '../../../global/modules/jwtHandler';
import redisClient from '../../../global/config/redisClient';

const createProducer = async(producerCreateDTO: ProducerCreateDTO, location: string): Promise<UserCreateResultDTO> => {
    try {
        const producer = await createUser.createProducer(producerCreateDTO, location);
        if (!producer) throw new ProducerJoinFail(rm.SIGNUP_FAIL);

        const result: UserCreateResultDTO = {
            id: producer.id,
            name: producer.name,
        };
        return result;
    } catch (error) {
        throw(error);
    }
};

const createVocal = async(vocalCreateDTO: VocalCreateDTO, location: string): Promise<UserCreateResultDTO> => {
    try {
        const vocal = await createUser.createVocal(vocalCreateDTO, location);
        if (!vocal) throw new VocalJoinFail(rm.SIGNIN_FAIL);

        const result: UserCreateResultDTO = {
            id: vocal.id,
            name: vocal.name,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const joinToken = async(tableName: string, user: UserCreateResultDTO) => {
    try {
        const accessToken = jwtUtils.signAccess(tableName, user.id);
        const refreshToken = jwtUtils.signRefresh(tableName, user.id);

        const redisKeyArray: string[] = ['Table', tableName, 'UserID', user.id as unknown as string];
        await redisClient.set(redisKeyArray.join(':'), refreshToken); 

        const result: RefreshAccessTokenDTO = {
            accessToken,
            refreshToken,
        };  
        return result;
    } catch (error) {
        throw error;
    }
};

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

const checkName = async(userName: string, tableName: string): Promise<CheckNameResultDTO> => {
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
    createProducer,
    createVocal,
    joinToken,
    userLogin,
    checkName,
};

export default UserService;