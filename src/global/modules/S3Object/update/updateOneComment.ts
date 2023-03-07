import multipartS3 from '../../../../infra/aws/s3MultipartConfig';
import config from '../../../config';
import { rm } from '../../../constants';
import { DeleteCommentS3Object } from '../../../middlewares/error/errorInstance';


//! S3 버킷에서 게시글의 오디오파일객체 삭제하기 
const updateS3CommentAudio = async (audioFile: string) => {

    try {

        if (audioFile) {

            try {

                await multipartS3
                            .deleteObject
                                ({
                                    Bucket: config.commentsBucketName,
                                    Key: audioFile,
                                })
                            .promise();

            } catch (error) {

                throw new DeleteCommentS3Object(rm.DELETE_S3_COMMENT_OBJECT_FAIL);

            }

        }

    } catch (error) {

        throw error;

    }

};


export default updateS3CommentAudio;