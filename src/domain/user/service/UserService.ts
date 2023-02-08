import { AlreadyExistsEmail, ProducerJoinFail, ResetPasswordTimePassed, UnauthorizedUser, UpdateUserFail, VocalJoinFail } from './../../../global/middlewares/error/errorInstance/user';
import bcrypt from "bcryptjs";
import { rm } from '../../../global/constants';
import { IncorrectLoginPassword, LoginIDNonExists } from '../../../global/middlewares/error/errorInstance';
import { CheckNameResultDTO, ProducerCreateDTO, RefreshAccessTokenDTO, SignInDTO, SignInResultDTO, UserUpdateDTO, VocalCreateDTO } from '../interfaces';
import { createUser, getUserByEmail, getUserById, getUserByLoginID, getUserByName, updateUserProfile, updatePassword, findAuthByToken, deleteEveryAuthById } from '../repository';
import UserCreateResultDTO from '../interfaces/UserCreateReturnDTO';
import jwtUtils from '../../../global/modules/jwtHandler';
import redisClient from '../../../global/config/redisClient';

const createProducer = async(producerCreateDTO: ProducerCreateDTO, location: string): Promise<UserCreateResultDTO> => {
    try {
        const emailExists = await getUserByEmail.producerEmailExists(producerCreateDTO.ID);
        if (emailExists) throw new AlreadyExistsEmail(rm.ALREADY_EXISTS_EMAIL);

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(producerCreateDTO.PW, salt); 

        const producer = await createUser.createProducer(producerCreateDTO, password, location);
        if (!producer) throw new ProducerJoinFail(rm.SIGNUP_FAIL);

        const result: UserCreateResultDTO = {
            id: producer.id,
            name: producer.name,
            tableName: 'producer',
            userId: producer.producerID
        };
        return result;
    } catch (error) {
        throw(error);
    }
};

const createVocal = async(vocalCreateDTO: VocalCreateDTO, location: string): Promise<UserCreateResultDTO> => {
    try {
        const emailExists = await getUserByEmail.vocalEmailExists(vocalCreateDTO.ID);
        if (emailExists) throw new AlreadyExistsEmail(rm.ALREADY_EXISTS_EMAIL);

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(vocalCreateDTO.PW, salt); 

        const vocal = await createUser.createVocal(vocalCreateDTO, password, location);
        if (!vocal) throw new VocalJoinFail(rm.SIGNIN_FAIL);

        const result: UserCreateResultDTO = {
            id: vocal.id,
            name: vocal.name,
            tableName: 'vocal',
            userId: vocal.vocalID
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const joinToken = async(tableName: string, user: UserCreateResultDTO): Promise<RefreshAccessTokenDTO> => {
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

const updateUser = async(profileDTO: UserUpdateDTO): Promise<UserCreateResultDTO> => {
    try {
        const user = (profileDTO.tableName === 'producer') ?
                        await getUserById.producer(profileDTO.userId) :
                        await getUserById.vocal(profileDTO.userId);
        if (!user) throw new UnauthorizedUser(rm.NO_USER);

        const updateResult = (profileDTO.tableName === 'producer') ? 
                                await updateUserProfile.updateProducerProfile(profileDTO) :
                                await updateUserProfile.updateVocalProfile(profileDTO);
        if (!updateResult) throw new UpdateUserFail(rm.FAIL_UPDATE_USER_PROFILE);

        const result: UserCreateResultDTO = (profileDTO.tableName === 'producer') ?
                                                getProfileUpdateReturn(updateResult, 'producer') :
                                                getProfileUpdateReturn(updateResult, 'vocal');

        return result;
    } catch (error) {
        throw error;
    }
};

const userLogin = async(logInDTO: SignInDTO): Promise<SignInResultDTO> => {
    try {
        const producer = await getUserByLoginID.producerLogin(logInDTO.ID);
        const vocal = await getUserByLoginID.vocalLogin(logInDTO.ID);

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

//~ 현재 필요없는 API
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

const updateUserPassword = async(token: string, password: string) => {
    try {
        const auth = await findAuthByToken(token);
        if (!auth) throw new ResetPasswordTimePassed(rm.PASSWORD_RESET_TIME_PASSED);  //! 비밀번호 재설정 메일 보낸지 3시간 초과한 경우 
        
        const salt = await bcrypt.genSalt(10);
        const newPasword = await bcrypt.hash(password, salt); 

        const data = (auth.tableName === 'producer') ?
                            await updatePassword.updateProducerPassword(auth.userId, newPasword) :
                            await updatePassword.updateVocalPassword(auth.userId, newPasword);
        if (!data) throw new UpdateUserFail(rm.FAIL_UPDATE_USER_PASSWORD);

        const result: UserCreateResultDTO = (auth.tableName === 'producer') ?
                                                getPasswordUpdateReturn(data.id, data.name, auth.userEmail, 'producer') :
                                                getPasswordUpdateReturn(data.id, data.name, auth.userEmail, 'vocal');
            
        return result;
    } catch (error) {
        throw error;
    }
};

const isPasswordTokenValid = async(token: string) => {
    try {
        const auth = await findAuthByToken(token);
        if (!auth) throw new ResetPasswordTimePassed(rm.PASSWORD_RESET_TIME_PASSED);  //! 비밀번호 재설정 메일 보낸지 3시간 초과한 경우 
    } catch (error) {
        throw error;
    }
};

const deleteAuthData = async(tableName: string, id: number) => {
    try {
        await deleteEveryAuthById(tableName, id);
    } catch (error) {
        throw error;
    }
};

const getProfileUpdateReturn = (data: any, tableName: string): UserCreateResultDTO => {
    const result = {
        id: data.id,
        name: data.name,
        userId: data.producerID || data.vocalID,
        tableName,
    };

    return result;
};

const getPasswordUpdateReturn = (id: number, name: string, email: string, tableName: string): UserCreateResultDTO => {
    const result = {
        id,
        name,
        userId: email,
        tableName,
    };

    return result;
};

const UserService = {
    createProducer,
    createVocal,
    joinToken,
    updateUser,
    userLogin,
    checkName,
    updateUserPassword,
    deleteAuthData,
    isPasswordTokenValid,
};

export default UserService;