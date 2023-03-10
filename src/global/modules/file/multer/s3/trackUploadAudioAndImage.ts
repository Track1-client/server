import multer from 'multer';
import multerS3 from "multer-s3";
import s3 from '../../../../../infra/aws/s3Config';
import fileFilter from '../../fileFilter';


//* 오디오 & 이미지 파일 S3 업로드
const tracksAudioAndImage = (bucketName: string) => multer({

    storage: multerS3({

        s3: s3,
        bucket: bucketName, 
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read", 
        key: function (req: Express.Request, file: Express.MulterS3.File, cb) {

            var  newFileName = Date.now() + "-" + encodeURI(file.originalname);
            var pathName = (file.mimetype.split('/')[0] === 'audio') ? 'audio/' : 'image/';   //! 파일 타입(audio/image)에 따른 버킷 내부 디렉토리 경로 설정 
            
            var fullPath = pathName + newFileName;
            cb(null, fullPath);

        }

    }),
    
    fileFilter: function (req: Express.Request, file: Express.MulterS3.File, cb) {

        var fileType = ( file.fieldname === 'audioFile' ) ?  fileFilter.audioFileFilter : fileFilter.imageFileFilter;
        return fileType(req, file, cb);

    },

}).fields([ 
    {name: 'jacketImage', maxCount: 1},
    {name: 'audioFile', maxCount: 1}
]);   


export default tracksAudioAndImage;
