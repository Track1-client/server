import commentAudioMulter from './s3/commentUploadAudio';
import portfolioAudioAndImage from './s3/portfolioUploadAudioAndImage';
import profileImageMulter from './s3/profileImageMulter';
import tracksAudioAndImage from './s3/trackUploadAudioAndImage';

const multerModules = {
    profileImageMulter,
    tracksAudioAndImage,
    commentAudioMulter,
    portfolioAudioAndImage,
};

export default multerModules;