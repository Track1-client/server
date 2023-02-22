import config from '../../../../config';
import { rm } from '../../../../constants';
import { NoAudioFile } from '../../../../middlewares/error/errorInstance';

const updateProducerPortfolioFileKey = (myfiles: any) => {
    let jacketImageKey = '';
    let audioFileKey = '';

    if ("jacketImage" in myfiles) jacketImageKey = myfiles['jacketImage'][0]['key'] as string;
    if ("audioFile" in myfiles) audioFileKey = myfiles['audioFile'][0]['key'] as string;
    
    return {
        jacketImageKey,
        audioFileKey,
    };
};

export default updateProducerPortfolioFileKey;