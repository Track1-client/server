import { DeleteCommentS3Object } from './../../../middlewares/error/errorInstance/S3/DeleteCommentS3Object';
import multipartS3 from '../../../../infra/aws/s3MultipartConfig';
import config from '../../../config';
import { rm } from '../../../constants';


//! S3 버킷에서 게시글의 오디오파일객체 삭제하기 
const deleteS3CommentAudio = async (audioFile: string) => {

    try {

        if (audioFile) {

            await multipartS3
                    .deleteObject
                        ({
                            Bucket: config.commentsBucketName,
                            Key: audioFile,
                        })
                    .promise();
                    
        }

        else throw new DeleteCommentS3Object(rm.DELETE_S3_COMMENT_OBJECT_FAIL);

    } catch (error) {

        throw error;

    }

};


export default deleteS3CommentAudio;