import multer from "multer";
import multerS3 from "multer-s3";
import s3 from '../../../../../infra/aws/s3Config';
import fileFilter from '../../fileFilter';

const commentAudioMulter = (bucketName: string) => multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName, 
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read", 
        key: function (req: Express.Request, file: Express.MulterS3.File, cb) {
            var  newFileName = Date.now() + "-" + file.originalname;
            
            cb(null, newFileName);
        },
    }),
    fileFilter: fileFilter.audioFileFilter,
}).single('audioFile');

export default commentAudioMulter;

