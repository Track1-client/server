import { Request, Response, NextFunction } from 'express';
import { rm, sc } from '../../../global/constants';
import { success } from '../../../global/constants/response';
import jwtUtils from '../../../global/modules/jwtHandler';
import redisClient from '../../../global/config/redisClient';
import { ProducerCreateDTO, SignInDTO, SignInResultDTO, VocalCreateDTO } from '../interfaces';
import UserService from '../service/UserService';
import TokenService from '../service/TokenService';
import config from '../../../global/config';

const createProducer = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const producerCreateDTO: ProducerCreateDTO = req.body;
        const profileImage: Express.MulterS3.File = req.file as Express.MulterS3.File;

        if (!profileImage) var location = config.defaultUserProfileImage; 
        else var { location } = profileImage;

        const result = await UserService.createProducer(producerCreateDTO, location as string);
        return res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGNUP_SUCCESS, result));
    } catch (error) {
        return next(error);
    }
};

const createVocal = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const vocalCreateDTO: VocalCreateDTO = req.body;
        const profileImage: Express.MulterS3.File = req.file as Express.MulterS3.File;

        if (!profileImage) var location = config.defaultUserProfileImage; 
        else var { location } = profileImage;

        const result = await UserService.createVocal(vocalCreateDTO, location as string);
        return res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGNUP_SUCCESS, result));
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
            accessToken,
            refreshToken,
        };
    
        return res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
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


const UserController = {
    createProducer,
    createVocal,
    signIn,
    checkName,
};

export default UserController;