import { rm } from '../../../../constants';
import { NoAudioFile } from '../../../../middlewares/error/errorInstance';

const updateAudioFileKey = (audioFileObject: any) => {
    const audioFileKey = (audioFileObject) ? audioFileObject['key'] as string : '';
    
    return audioFileKey;
};

export default updateAudioFileKey;