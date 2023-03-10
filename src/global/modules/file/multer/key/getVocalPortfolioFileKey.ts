import config from '../../../../config';
import { rm } from '../../../../constants';
import { NoAudioFile } from '../../../../middlewares/error/errorInstance';

const getVocalPortfolioFileKey = (myfiles: any) => {
    
    //* 재킷이미지 없는 경우 -> default vocal jacketImage로 설정
    const jacketImageKey = !("jacketImage" in myfiles) ? 
            config.defaultVocalPortfolioImage : myfiles['jacketImage'][0]['key'] as string;
    
    //* audioFile 없는 경우 -> 오류 반환
    if(!("audioFile" in myfiles)) throw new NoAudioFile(rm.NO_AUDIO_FILE);
    const audioFileKey = myfiles['audioFile'][0]['key'] as string;
    

    return { jacketImageKey, audioFileKey };

};

export default getVocalPortfolioFileKey;