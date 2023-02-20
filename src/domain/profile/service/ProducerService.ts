import config from '../../../global/config';
import { rm } from '../../../global/constants';
import { UpdateProducerProfileFail } from '../../../global/middlewares/error/errorInstance';
import updateS3ProfileImage from '../../../global/modules/S3Object/update/updateOneProfileImage';
import { getUserById } from '../../user/repository';
import { ProducerProfileUpdateDTO, ProducerProfileUpdateReturnDTO } from '../interfaces';
import { updateProducerProfileByUserId } from '../repository';

const updateProducerProfile = async(profileDTO: ProducerProfileUpdateDTO, tableName: string, userId: number, imageFileKey: string) => {
    try {
        const user = await getUserById.producer(userId);
        await updateS3ProfileImage(user?.producerImage as string);

        const data = await updateProducerProfileByUserId(userId, profileDTO, imageFileKey);
        if (!data || tableName !== 'producer') throw new UpdateProducerProfileFail(rm.UPDATE_PRODUCER_PROFILE_FAIL);

        return data;
    } catch (error) {
        throw error;
    }
}


const ProducerService = {
    updateProducerProfile,
};

export default ProducerService;