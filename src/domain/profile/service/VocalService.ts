import { rm } from '../../../global/constants';
import { GetVocalInfoFail, UpdateVocalProfileFail } from '../../../global/middlewares/error/errorInstance';
import updateS3ProfileImage from '../../../global/modules/S3Object/update/updateOneProfileImage';
import { getUserById } from '../../user/repository';
import { VocalProfileGetDTO, VocalProfileGetReturnDTO, VocalProfileUpdateDTO } from '../interfaces';
import { getVocalProfileById, updateVocalProfileByUserId } from '../repository';


const getVocalProfile = async (profileDTO: VocalProfileGetDTO, vocalId: number, page: number, limit: number) => {

    try {

        const isMe = (profileDTO.tableName === 'vocal' && vocalId === Number(profileDTO.userId)) ? true : false;
        
        const data = await getVocalProfileById(vocalId, limit, page);
        if (!data) throw new GetVocalInfoFail(rm.GET_USER_INFORMATION_FAIL);

        const result: VocalProfileGetReturnDTO = {

            whoamI: profileDTO.tableName,
            isMe: isMe,
            vocalProfile: data.profileDTO,
            vocalPortfolio: data.portfolioList

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const updateVocalProfile = async(profileDTO: VocalProfileUpdateDTO, tableName: string, userId: number, imageFileKey: string) => {
    
    try {

        const user = await getUserById.vocal(userId);
        
        const data = await updateVocalProfileByUserId(userId, profileDTO, imageFileKey);
        if (!data || tableName !== 'vocal') throw new UpdateVocalProfileFail(rm.UPDATE_VOCAL_PROFILE_FAIL);
        
        
        await updateS3ProfileImage(user?.vocalID as string);

        return data;

    } catch (error) {

        throw error;

    }

};


const VocalService = {

    getVocalProfile,
    updateVocalProfile

};


export default VocalService;