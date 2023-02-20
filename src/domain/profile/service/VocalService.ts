import { rm } from '../../../global/constants';
import { UpdateVocalProfileFail } from '../../../global/middlewares/error/errorInstance';
import updateS3ProfileImage from '../../../global/modules/S3Object/update/updateOneProfileImage';
import { getUserById } from '../../user/repository';
import { VocalProfileUpdateDTO } from '../interfaces';
import { updateVocalProfileByUserId } from '../repository';

const updateVocalProfile = async(profileDTO: VocalProfileUpdateDTO, tableName: string, userId: number, imageFileKey: string) => {
    try {
        const user = await getUserById.vocal(userId);
        await updateS3ProfileImage(user?.vocalID as string);

        const data = await updateVocalProfileByUserId(userId, profileDTO, imageFileKey);
        if (!data || tableName !== 'vocal') throw new UpdateVocalProfileFail(rm.UPDATE_VOCAL_PROFILE_FAIL);

        return data;
    } catch (error) {
        throw error;
    }
}


const VocalService = {
    updateVocalProfile,
};

export default VocalService;