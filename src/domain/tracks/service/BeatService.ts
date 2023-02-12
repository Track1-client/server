import deleteS3AudioAndImage from '../../../global/modules/S3Object/delete/deleteBeat';
import { BeatCreatDTO, BeatCreateReturnDTO, DeleteBeatReturnDTO } from '../interfaces';
import { getUserById } from '../../user/repository';
import { NotProducer, NotProducerBeat } from '../../../global/middlewares/error/errorInstance';
import { rm } from '../../../global/constants';
import { createBeatByUserId, findBeatByUserId } from '../repository';

const createBeat = async(beatDTO: BeatCreatDTO, audioFileLocation: string, imageFileLocation: string) => {
    try {
        const isProducer = (await getUserById.producer(Number(beatDTO.userId))) && (beatDTO.tableName === 'producer');
        
        if (!isProducer) throw new NotProducer(rm.NOT_PRODUCER);

        const data = await createBeatByUserId(beatDTO, audioFileLocation, imageFileLocation);
        
        const result: BeatCreateReturnDTO = {
            beatId: data.id,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteBeatById = async(userId: number, beatId: number) => {
    try {
        const userBeatData = await findBeatByUserId(userId, beatId);
        if (!userBeatData) throw new NotProducerBeat(rm.PRODUCER_BEAT_UNMATCH);
        
        await deleteS3AudioAndImage(userBeatData.beatFile, userBeatData.beatImage);  //! S3 객체 삭제 
        //await deleteBeatById(userId, beatId);

        const result: DeleteBeatReturnDTO = {
            beatId,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const BeatService = {
    createBeat,
    deleteBeatById,
};

export default BeatService;