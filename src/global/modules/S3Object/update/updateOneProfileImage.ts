import multipartS3 from '../../../../infra/aws/s3MultipartConfig';
import config from '../../../config';

//! S3 버킷에서 게시글의 오디오파일객체 삭제하기 
const updateS3ProfileImage = async (imageFile: string) => {

    try {

        if (imageFile && imageFile !== config.defaultUserProfileImage) {

            await multipartS3
                        .deleteObject
                            ({
                                Bucket: config.profileImageBucketName,
                                Key: imageFile,
                            })
                        .promise();
                        
        }

    } catch (error) {

        throw error;

    }

};


export default updateS3ProfileImage;