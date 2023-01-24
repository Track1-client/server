import jwt, { JwtPayload } from 'jsonwebtoken';
import { rm, tokenType } from '../../../global/constants';
import jwtUtils from '../../../global/modules/jwtHandler';
import { RefreshAccessTokenDTO } from '../interfaces';
import { 
    RefreshTokenDoesNotExists, 
    AccessTokenDoesNotExists,
    AccessTokenInvalid,
    UnauthorizedUser,
    AccessTokenNotExpired,
} from './../../../global/middlewares/error/errorInstance/user';


const isTokenExists = async(accessToken: string, refreshToken: string) => {
    try {
        if (!accessToken) throw new AccessTokenDoesNotExists(rm.EMPTY_ACCESS_TOKEN);
        else if (!refreshToken) throw new RefreshTokenDoesNotExists(rm.EMPTY_REFRESH_TOKEN);
    } catch(error) {
        throw error;
    }
};

const isValidRefresh = async(accessToken: string, refreshToken: string) => {
    try {
        const accessTokenResult = jwtUtils.accessVerify(accessToken); //! expired 여야 accesstoken 재발급 가능함 
        const decoded = jwt.decode(accessToken) as JwtPayload;

        if (!decoded) throw new AccessTokenInvalid(rm.INVALID_ACCESS_TOKEN); //! decoding 결과 없는 경우
    
        const refreshTokenResult = await jwtUtils.refreshVerify(refreshToken, decoded.tableName, decoded.userId);
        
        //* access token이 만료된 경우 
        if (!accessTokenResult.decoded && accessTokenResult.message === tokenType.ACCESS_TOKEN_EXPIRED) {
            //* access token, refresh token 둘 다 만료된 경우 -> 새로 로그인하기 
            if (refreshTokenResult !== true) throw new UnauthorizedUser(rm.NEED_TO_LOGIN);
            //* access token만 만료된 경우 -> access token 새로 발급받기 
            else {
                const newAccessToken = jwtUtils.signAccess(decoded.tableName, decoded.userId);
                
                const data: RefreshAccessTokenDTO = {
                    accessToken: newAccessToken,
                    refreshToken
                };
                return data;
            }
        }
        //* access token이 만료되지 않은 경우 -> refresh 필요 없음 
        else {  
            throw new AccessTokenNotExpired(rm.NON_EXPIRED_ACCESS_TOKEN);
        }
    } catch(error) {
        throw error;
    }
    
};

const TokenService = {
    isTokenExists,
    isValidRefresh,
};

export default TokenService;