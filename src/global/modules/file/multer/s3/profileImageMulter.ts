import multer from "multer";
import multerS3 from "multer-s3";
import s3 from '../../../../../infra/aws/s3Config';


const profileImageMulter = (bucketName: string, pathName: string, fileFilter: any) => multer({

    storage: multerS3({

        s3: s3,
        bucket: bucketName, 
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read", 
        key: function (req: Express.Request, file: Express.MulterS3.File, cb) {

            var  newFileName = Date.now() + "-" + file.originalname;
            var fullPath = pathName + newFileName;
            
            cb(null, fullPath);
            
        }
        
    }),

    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },   //! 최대 5MB의 이미지 크기  

}).single('imageFile');


export default profileImageMulter;

