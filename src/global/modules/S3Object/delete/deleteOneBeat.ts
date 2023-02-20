import { DeleteTrackS3Object } from '../../../middlewares/error/errorInstance';
import multipartS3 from '../../../../infra/aws/s3MultipartConfig';
import config from '../../../config';
import { rm } from '../../../constants';

//! S3 버킷에서 게시글의 오디오파일객체, 자켓이미지객체 삭제하기 
const deleteS3TrackAudioAndImage = async (audioFile: string, imageFile: string) => {
    try {
        if (audioFile) {
            const keyList = (imageFile && imageFile !== config.defaultJacketAndProducerPortfolioImage) ? 
                                [{ key: 'audio', value: audioFile }, { key: 'image', value: imageFile }] : 
                                [{ key: 'audio', value: audioFile }];
            const objects = keyList.map((obj) => {
                return { Key: obj.value }
            });
            
            await multipartS3
                    .deleteObjects
                        ({
                            Bucket: config.tracksBucketName,
                            Delete: { Objects: objects }
                        })
                    .promise();
        }
        else throw new DeleteTrackS3Object(rm.DELETE_S3_TRACK_AUDIO_AND_IMAGE_OBJECT_FAIL);
    } catch (error) {
        throw error;
    }
};

export default deleteS3TrackAudioAndImage;