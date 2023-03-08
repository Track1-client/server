import deleteS3TrackAudioAndImage from '../../../global/modules/S3Object/delete/deleteOneBeat';
import { BeatClosedUpdateDTO, BeatClosedUpdateReturnDTO, BeatCreateDTO, BeatCreateReturnDTO, BeatDeleteReturnDTO, BeatGetDTO, GetBeatFileReturnDTO } from '../interfaces';
import { getUserById } from '../../user/repository';
import { BeatFileUploadFail, NotProducer, NotProducerBeat, BeatFileUpdateFail, GetBeatsFail, GetBeatFileFail, InvalidBeatId, BeatClosedUpdateFail, GetBeatFail } from '../../../global/middlewares/error/errorInstance';
import { rm } from '../../../global/constants';
import { createBeatByUserId, deleteBeatByUserId, getBeatByIdAndUserId, getBeatByUserId, getBeatFileById, getBeatsByCateg, updateBeatById, updateBeatClosedById } from '../repository';
import config from '../../../global/config';
import updateS3TrackAudioAndImage from '../../../global/modules/S3Object/update/updateOneBeat';


const createBeat = async(beatDTO: BeatCreateDTO, tableName: string, userId: number, fileLocation: any) => {

    try {

        const isProducer = (await getUserById.producer(userId)) && (tableName === 'producer');
        if (!isProducer) throw new NotProducer(rm.NON_EXISTS_PRODUCER);

        const data = await createBeatByUserId(beatDTO, userId, fileLocation.audioFileKey, fileLocation.jacketImageKey);
        if (!data) throw new BeatFileUploadFail(rm.UPLOAD_TRACK_FILE_FAIL);
        

        const result: BeatCreateReturnDTO = {

            beatId: data.id

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const getBeatList = async(page: number, limit: number, categ: string[]) => {

    try {

        const data = await getBeatsByCateg(page, limit, categ);
        if (!data) throw new GetBeatsFail(rm.GET_TRACK_LIST_FAIL);

        return data;

    } catch (error) {

        throw error;

    }

};


const getBeat = async(beatDTO: BeatGetDTO, beatId: number) => {

    try {

        const data = await getBeatByIdAndUserId(beatId, beatDTO.tableName, Number(beatDTO.userId));
        if (!data) throw new GetBeatFail(rm.GET_TRACK_INFO_FAIL);

        return data;

    } catch (error) {

        throw error;

    }

};


const getBeatFile = async (beatId: number) => {

    try {

        const data = await getBeatFileById(beatId);
        if (!data) throw new GetBeatFileFail(rm.GET_TRACK_FILE_FAIL);

        const result: GetBeatFileReturnDTO = {

            beatId: data.beat.id,
            wavFile: data.beatURL as string,
            wavFileLength: data.beat.duration

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const updateBeat = async(beatDTO: BeatCreateDTO, beatId: number, tableName: string, userId: number, fileLocation: any) => {

    try {

        const userBeatData = await getBeatByUserId(userId, beatId);
        if (!userBeatData || tableName !== 'producer') throw new NotProducerBeat(rm.PRODUCER_BEAT_UNMATCH);
        

        //* DB 업데이트
        const newBeatAudio = ( fileLocation.audioFileKey ) ? fileLocation.audioFileKey : userBeatData.beatFile;  //& 수정할 오디오 존재하면 해당 오디오파일key값, 아니면 기존 오디오파일key값
        const newBeatImage = ( fileLocation.jacketImageKey ) ? fileLocation.jacketImageKey : config.defaultJacketAndProducerPortfolioImage; //& 수정할 이미지 존재하면 해당 이미지파일key값, 아니면 기본 이미지 
        
        const data = await updateBeatById(beatDTO, beatId, userId, String(newBeatAudio), newBeatImage); 
        if (!data) throw new BeatFileUpdateFail(rm.UPDATE_TRACK_FAIL);


        //* S3 객체 삭제
        const beatAudio = ( fileLocation.audioFileKey ) ? userBeatData.beatFile : false;  //& 수정할 오디오 존재하는 경우, 기존 게시글의 오디오객체 삭제 
        const beatImage = userBeatData.beatImage; //& 수정할 이미지 존재하는 경우, 기존 게시글의 이미지객체 삭제 / 이미지 없는 경우 기본이미지로 바꾸기 위해 기존 게시글 이미지 객체 삭제 
        
        await updateS3TrackAudioAndImage(beatAudio as string, beatImage as string);  


        const result: BeatCreateReturnDTO = {

            beatId: data.id

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const updateBeatClosed = async(beatId: number, closedDTO: BeatClosedUpdateDTO) => {

    try {

        const beat = await getBeatByUserId(Number(closedDTO.userId), beatId);
        if (!beat) throw new InvalidBeatId(rm.PRODUCER_BEAT_UNMATCH);

        const data = await updateBeatClosedById(beatId, beat.isClosed);
        if (!data) throw new BeatClosedUpdateFail(rm.UPDATE_TRACK_CLOSED_FAIL);


        const result: BeatClosedUpdateReturnDTO = {

            closedStatus: data.isClosed  //! true -> 게시글 마감, false -> 게시글 오픈 

        };
        
        return result;

    } catch (error) {

        throw error;

    }

};


const deleteBeatById = async(userId: number, beatId: number) => {

    try {

        const userBeatData = await getBeatByUserId(userId, beatId);
        if (!userBeatData) throw new NotProducerBeat(rm.PRODUCER_BEAT_UNMATCH);

        await deleteBeatByUserId(userId, beatId); //! DB 삭제 
        await deleteS3TrackAudioAndImage(userBeatData.beatFile, userBeatData.beatImage);  //! S3 객체 삭제 


        const result: BeatDeleteReturnDTO = {

            userId

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const BeatService = {

    createBeat,
    getBeatList,
    getBeat,
    getBeatFile,
    updateBeat,
    updateBeatClosed,
    deleteBeatById

};


export default BeatService;