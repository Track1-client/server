import { rm } from '../../../global/constants';
import { UpdateProducerProfileFail } from '../../../global/middlewares/error/errorInstance';
import { ProducerProfileUpdateDTO, ProducerProfileUpdateReturnDTO } from '../interfaces';
import { updateProducerProfileByUserId } from '../repository';

const updateProducerProfile = async(profileDTO: ProducerProfileUpdateDTO, tableName: string, userId: number, imageFileKey: string) => {
    try {
        const data = await updateProducerProfileByUserId(userId, profileDTO, imageFileKey);
        if (!data || tableName !== 'producer') throw new UpdateProducerProfileFail(rm.UPDATE_PRODUCER_PROFILE_FAIL);

        const result: ProducerProfileUpdateReturnDTO = {
            name: data.name,
            tableName: 'producer',
            producerId: data.id as number,
            profileImage: data.producerImage,
        };

        return result;
    } catch (error) {
        throw error;
    }
}


const ProducerService = {
    updateProducerProfile,
};

export default ProducerService;