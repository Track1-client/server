import profileImageMulter from './profileImageMulter';
import tracksSoundAndImage from './tracksSoundAndImage';
import initiateMultipartUpload from './multipartUpload/initiateMultipartUpload';

const multerModules = {
    profileImageMulter,
    tracksSoundAndImage,
};

const multipartUpload = {
    initiateMultipartUpload,
};

export default multerModules;