import { rm } from '../../../constants';
import { InvalidImageFileType, NotImageFile } from '../../../middlewares/error/errorInstance';

const fileType = [
    'png',
    'jpg',
    'jpeg'
];

const imageFileFilter = (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
    var ext = file.mimetype.split('/')[1];    // ex) image/jpg 에서 jpg 추출
    var type = file.mimetype;                 // ex) image/jpg 전체  
    
    (type.startsWith('image') && fileType.includes(ext)) ? cb(null, true)
    : (!fileType.includes(ext)) ? cb(new InvalidImageFileType(rm.INVALID_IMAGE_FILE_TYPE))  // 이미지 파일 형식이 옳지 않은 경우
    : cb(new NotImageFile(rm.NOT_IMAGE_FILE));   // 아예 이미지가 아닌 경우 
};

export default imageFileFilter;