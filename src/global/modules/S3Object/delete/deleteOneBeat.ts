import { DeleteTrackS3Object } from '../../../middlewares/error/errorInstance';
import multipartS3 from '../../../../infra/aws/s3MultipartConfig';
import config from '../../../config';
import { rm } from '../../../constants';

const deleteParams = {
    Bucket: config.tracksBucketName,
    Delete: { Objects: [] },
}

//! S3 버킷에서 게시글의 오디오파일객체, 자켓이미지객체 삭제하기 
const deleteS3AudioAndImage = async (audioFile: string, imageFile: string) => {
    try {
        const keyList = (imageFile !== config.defaultJacketAndProducerPortfolioImage) ? 
                            [{ key: 'audio', value: audioFile }, { key: 'image', value: imageFile }] : 
                            [{ key: 'audio', value: audioFile }];

        const objects = keyList.map((obj) => {
            return { Key: obj.value }
        });

        const objectParams = {
            Bucket: config.tracksBucketName,
            Delete: { Objects: objects }
        };

        await multipartS3.deleteObjects(objectParams).promise();
    } catch (error) {
        throw new DeleteTrackS3Object(rm.FAIL_DELETE_S3_TRACK_AUDIO_AND_IMAGE_OBJECT);
    }
};

export default deleteS3AudioAndImage;