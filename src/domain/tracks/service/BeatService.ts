import deleteS3AudioAndImage from '../../../global/modules/S3Object/delete/deleteOneBeat';
import { BeatCreatDTO, BeatCreateReturnDTO, BeatUpdateDTO, DeleteBeatReturnDTO } from '../interfaces';
import { getUserById } from '../../user/repository';
import { BeatFileUploadFail, NotProducer, NotProducerBeat } from '../../../global/middlewares/error/errorInstance';
import { rm } from '../../../global/constants';
import { createBeatByUserId, deleteBeatByUserId, findBeatByUserId } from '../repository';

const createBeat = async(beatDTO: BeatCreatDTO, audioFileLocation: string, imageFileLocation: string) => {
    try {
        const isProducer = (await getUserById.producer(Number(beatDTO.userId))) && (beatDTO.tableName === 'producer');
        if (!isProducer) throw new NotProducer(rm.NOT_PRODUCER);

        const data = await createBeatByUserId(beatDTO, audioFileLocation, imageFileLocation);
        if (!data) throw new BeatFileUploadFail(rm.UPLOAD_TRACK_FILE_FAIL);
        
        const result: BeatCreateReturnDTO = {
            beatId: data.id,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const updateBeat = async(beatDTO: BeatUpdateDTO, audioFileLocation: string, imageFileLocation: string) => {
    try {
        const userBeatData = await findBeatByUserId(beatDTO.userId, beatDTO.beatId);
        if (!userBeatData) throw new NotProducerBeat(rm.PRODUCER_BEAT_UNMATCH);

        await deleteS3AudioAndImage(userBeatData.beatFile, userBeatData.beatImage);  //! S3 객체 삭제

        //const updateBeatData = await updateBeatById(beatDTO, audioFileLocation, imageFileLocation);




    } catch (error) {
        throw error;
    }
};

const deleteBeatById = async(userId: number, beatId: number) => {
    try {
        const userBeatData = await findBeatByUserId(userId, beatId);
        if (!userBeatData) throw new NotProducerBeat(rm.PRODUCER_BEAT_UNMATCH);
        
        await deleteS3AudioAndImage(userBeatData.beatFile, userBeatData.beatImage);  //! S3 객체 삭제 
        await deleteBeatByUserId(userId, beatId); //! DB 삭제 

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
    updateBeat,
    deleteBeatById,
};

export default BeatService;