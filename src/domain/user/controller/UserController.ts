import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import jwtUtils from '../../../global/modules/jwtHandler';
import redisClient from '../../../global/config/redisClient';
import { ProducerCreateDTO, SignInDTO, SignInResultDTO, VocalCreateDTO, UserUpdateDTO, NewPasswordDTO } from '../interfaces';
import UserService from '../service/UserService';
import TokenService from '../service/TokenService';
import getLocation from '../../../global/modules/file/multer/key';

const cookieInfo: any = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    domain: '.track1.site',
    maxAge: 60 * 24 * 60 * 60 * 1000,
};

const createProducer = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const producerCreateDTO: ProducerCreateDTO = req.body;
        const profileImage: Express.MulterS3.File = req.file as Express.MulterS3.File;

        const key = getLocation.getProfileImageFileKey(profileImage);

        const userResult = await UserService.createProducer(producerCreateDTO, key as string); //! DB에 유저 정보 저장 
        const tokenResult = await UserService.joinToken('producer', userResult); //! access, refresh 토큰 생성 

        const joinResult = {
            userResult,
            accessToken: tokenResult.accessToken
        }
        return res
                .cookie('refreshToken', tokenResult.refreshToken, cookieInfo)
                .status(sc.CREATED)
                .send(success(sc.CREATED, rm.SIGNUP_SUCCESS, joinResult));
    } catch (error) {
        return next(error);
    }
};

const createVocal = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const vocalCreateDTO: VocalCreateDTO = req.body;
        const profileImage: Express.MulterS3.File = req.file as Express.MulterS3.File;

        const key = getLocation.getProfileImageFileKey(profileImage);

        const userResult = await UserService.createVocal(vocalCreateDTO, key as string); //! DB에 유저 정보 저장 
        const tokenResult = await UserService.joinToken('vocal', userResult); //! access, refresh 토큰 생성 

        const joinResult = {
            userResult,
            accessToken: tokenResult.accessToken
        };

        return res
                .cookie('refreshToken', tokenResult.refreshToken, cookieInfo)
                .status(sc.CREATED)
                .send(success(sc.CREATED, rm.SIGNUP_SUCCESS, joinResult));
    } catch (error) {
        return next(error);
    }
};

const updateProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userUpdateDTO: UserUpdateDTO = req.body;
        const userResult = await UserService.updateUser(userUpdateDTO);

        return res.status(sc.OK).send(success(sc.OK,rm.SUCCESS_UPDATE_USER_PROFILE, userResult));
    } catch (error) {
        return next(error);
    }
};

const signIn = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userLogInDTO: SignInDTO = req.body;
        const data = await UserService.userLogin(userLogInDTO) as SignInResultDTO;

        const accessToken = jwtUtils.signAccess(data.tableName, data.userId);
        let refreshToken: string;

        //? 다중로그인 처리 -> refresh token이 valid한 경우 refresh token은 다시 재발급받지 않음
        const isRefreshToken = await TokenService.isRefreshTokenValid(data.tableName, data.userId);
        if (!isRefreshToken) {              //~ 재발급 필요 
            refreshToken = jwtUtils.signRefresh(data.tableName, data.userId);
            await redisClient.set(data.redisKey, refreshToken);  //! Redis에 refresh token 저장 
        } 
        else refreshToken = isRefreshToken;  //~ 원래 존재하는 refresh token 반환 

        const result = {
            tableName: data.tableName,
            id: data.userId,
            accessToken
        };
        
        return res
                .cookie('refreshToken', refreshToken, cookieInfo)
                .status(sc.OK)
                .send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const checkName = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, tableName } = req.query;
        
        const result = await UserService.checkName(name as string, tableName as string);  //! false -> 중복 닉네임 없음, true -> 중복 닉네임 존재 
        return res.status(sc.OK).send(success(sc.OK, rm.DONE_CHECK_USER_NAME, result));
    } catch (error) {
        return next(error);
    }
};

const updatePassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const passwordDTO: NewPasswordDTO = req.body;
        const { token } = req.params;

        const result = await UserService.updateUserPassword(token, passwordDTO.password);
        
        //! 비밀번호 초기화 후, refresh token 삭제 (무조건 다시 로그인 필요)
        await TokenService.deleteRefreshToken(result.tableName, result.id as unknown as string); 

        //! 비밀번호 초기화 후, Auth 테이블 데이터 삭제하기 
        await UserService.deleteAuthData(result.tableName, result.id);

        return res.status(sc.OK).send(success(sc.OK, rm.SUCCESS_UPDATE_USER_PASSWORD, result));
    } catch (error) {
        return next(error);
    }

};

const isPasswordTokenValid = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params;

        await UserService.isPasswordTokenValid(token);
        return res.status(sc.OK).send(success(sc.OK, rm.VALID_TOKEN, token));
    } catch (error) {
        return next(error);
    }
};

const UserController = {
    createProducer,
    createVocal,
    updateProfile,
    signIn,
    checkName,
    updatePassword,
    isPasswordTokenValid,
};

export default UserController;