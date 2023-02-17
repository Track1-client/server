import commentAudioMulter from './s3/commentUploadAudio';
import profileImageMulter from './s3/profileImageMulter';
import tracksAudioAndImage from './s3/trackUploadAudioAndImage';

const multerModules = {
    profileImageMulter,
    tracksAudioAndImage,
    commentAudioMulter,
};

export default multerModules;