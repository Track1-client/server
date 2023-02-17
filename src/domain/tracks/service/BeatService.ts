import deleteS3AudioAndImage from '../../../global/modules/S3Object/delete/deleteOneBeat';
import { BeatCreateDTO, BeatCreateReturnDTO, DeleteBeatReturnDTO } from '../interfaces';
import { getUserById } from '../../user/repository';
import { BeatFileUploadFail, NotProducer, NotProducerBeat, BeatFileUpdateFail, GetBeatsFail } from '../../../global/middlewares/error/errorInstance';
import { rm } from '../../../global/constants';
import { createBeatByUserId, deleteBeatByUserId, findBeatByUserId, findBeatsByCateg, updateBeatById } from '../repository';
import config from '../../../global/config';

const createBeat = async(beatDTO: BeatCreateDTO, tableName: string, userId: number, fileLocation: any) => {
    try {
        const isProducer = (await getUserById.producer(userId)) && (tableName === 'producer');
        if (!isProducer || tableName !== 'producer') throw new NotProducer(rm.NOT_PRODUCER);
        
        const data = await createBeatByUserId(beatDTO, userId, fileLocation.audioFileKey, fileLocation.jacketImageKey);
        if (!data) throw new BeatFileUploadFail(rm.UPLOAD_TRACK_FILE_FAIL);
        
        const result: BeatCreateReturnDTO = {
            beatId: data.id,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const getBeatList = async(page: number, limit: number, categ: string[]) => {
    try {
        const data = await findBeatsByCateg(page, limit, categ);
        if (!data) throw new GetBeatsFail(rm.GET_TRACK_LIST_FAIL);

        return data;
    } catch (error) {
        throw error;
    }
};

const updateBeat = async(beatDTO: BeatCreateDTO, beatId: number, tableName: string, userId: number, fileLocation: any) => {
    try {
        const userBeatData = await findBeatByUserId(userId, beatId);
        if (!userBeatData || tableName !== 'producer') throw new NotProducerBeat(rm.PRODUCER_BEAT_UNMATCH);
        
        //* S3 객체 삭제
        let beatAudio = ( fileLocation.audioFileKey ) ? userBeatData.beatFile : undefined;  //& 수정할 오디오 존재하는 경우, 기존 게시글의 오디오객체 삭제 
        let beatImage = userBeatData.beatImage; //& 수정할 이미지 존재하는 경우, 기존 게시글의 이미지객체 삭제 / 이미지 없는 경우 기본이미지로 바꾸기 위해 기존 게시글 이미지 객체 삭제 
        await deleteS3AudioAndImage(beatAudio as string, beatImage as string);  

        //* DB 업데이트
        beatAudio = ( fileLocation.audioFileKey ) ? fileLocation.audioFileKey : userBeatData.beatFile;  //& 수정할 오디오 존재하면 해당 오디오파일key값, 아니면 기존 오디오파일key값
        beatImage = ( fileLocation.jacketImageKey ) ? fileLocation.jacketImageKey : config.defaultJacketAndProducerPortfolioImage; //& 수정할 이미지 존재하면 해당 이미지파일key값, 아니면 기본 이미지 
        const data = await updateBeatById(beatDTO, beatId, userId, String(beatAudio), beatImage); 
        if (!data) throw new BeatFileUpdateFail(rm.UPDATE_TRACK_FAIL);

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
    getBeatList,
    updateBeat,
    deleteBeatById,
};

export default BeatService;