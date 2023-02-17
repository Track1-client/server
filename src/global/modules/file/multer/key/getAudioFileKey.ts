import { rm } from '../../../../constants';
import { NoAudioFile } from '../../../../middlewares/error/errorInstance';

const getAudioFileKey = (audioFileObject: any) => {
    //* audioFile 없는 경우 -> 오류 반환
    if(!audioFileObject) throw new NoAudioFile(rm.NO_AUDIO_FILE);
    const audioFileKey = audioFileObject['key'] as string;
    
    return audioFileKey;
};

export default getAudioFileKey;