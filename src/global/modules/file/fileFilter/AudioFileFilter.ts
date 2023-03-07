import { NotAudioFile, InvalidAudioFileType, AudioFileTooLarge } from './../../../middlewares/error/errorInstance';
import { rm } from '../../../constants';


const fileType = [

    'wav',
    'wave',
    'mp3',
    'mpeg'

];


const audioFileFilter = (req: Express.Request, file: Express.MulterS3.File, cb: any) => {

    var ext = file.mimetype.split('/')[1];    // ex) audio/wav 에서 wav 추출
    var type = file.mimetype;                 // ex) audio/wav 전체 
    
    
    (type.startsWith('audio') && fileType.includes(ext)) ? cb(null, true)
    : (!fileType.includes(ext)) ? cb(new InvalidAudioFileType(rm.INVALID_IMAGE_FILE_TYPE))  // 이미지 파일 형식이 옳지 않은 경우
    : cb(new NotAudioFile(rm.NOT_AUDIO_FILE));   // 아예 오디오가 아닌 경우 

};


export default audioFileFilter;
