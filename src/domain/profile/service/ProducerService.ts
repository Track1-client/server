import { rm } from '../../../global/constants';
import { GetProducerInfoFail, UpdateProducerProfileFail } from '../../../global/middlewares/error/errorInstance';
import updateS3ProfileImage from '../../../global/modules/S3Object/update/updateOneProfileImage';
import { getUserById } from '../../user/repository';
import { ProducerProfileGetDTO, ProducerProfileGetReturnDTO, ProducerProfileUpdateDTO } from '../interfaces';
import { getProducerProfileById, updateProducerProfileByUserId } from '../repository';

const getProducerProfile = async (profileDTO: ProducerProfileGetDTO, producerId: number, page: number, limit: number) => {
    try {
        const isMe = (profileDTO.tableName === 'producer' && producerId === Number(profileDTO.userId)) ? true : false;
        
        const data = await getProducerProfileById(producerId, page, limit);
        if (!data) throw new GetProducerInfoFail(rm.GET_USER_INFORMATION_FAIL);

        const result: ProducerProfileGetReturnDTO = {
            whoamI: profileDTO.tableName,
            isMe: isMe,
            producerProfile: data.profileDTO,
            producerPortfolio: data.portfolioList,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const updateProducerProfile = async (profileDTO: ProducerProfileUpdateDTO, tableName: string, userId: number, imageFileKey: string) => {
    try {
        const user = await getUserById.producer(userId);
        await updateS3ProfileImage(user?.producerImage as string);

        const data = await updateProducerProfileByUserId(userId, profileDTO, imageFileKey);
        if (!data || tableName !== 'producer') throw new UpdateProducerProfileFail(rm.UPDATE_PRODUCER_PROFILE_FAIL);

        return data;
    } catch (error) {
        throw error;
    }
};

const ProducerService = {
    getProducerProfile,
    updateProducerProfile,
};

export default ProducerService;