import multer from 'multer';
import multerS3 from "multer-s3";
import s3 from '../../../../../infra/aws/s3Config';
import fileFilter from '../../fileFilter';

//* 오디오 & 이미지 파일 S3 업로드
const tracksUpdateSoundAndImage = (bucketName: string) => multer();   


export default tracksUpdateSoundAndImage;
