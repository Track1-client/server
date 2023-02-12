import { DeleteTrackS3Object } from './../../../middlewares/error/errorInstance';
import multipartS3 from '../../../../infra/aws/s3MultipartConfig';
import config from '../../../config';
import { rm } from '../../../constants';

//! S3 버킷에서 게시글의 오디오파일객체, 자켓이미지객체 삭제하기 
const deleteS3AudioAndImage = async (audioFile: string, imageFile: string) => {
    try {
        const keyList = (imageFile !== config.defaultJacketAndProducerPortfolioImage) ? [audioFile, imageFile] : [audioFile];
        const objects = keyList.map(function(key) {
            const fileName = key.split(config.tracksBucketName + '.s3.ap-northeast-2.amazonaws.com/').reverse()[0];
            console.log(fileName);
            return { Key: fileName }
        });
    
        console.log(objects);

        await multipartS3.deleteObjects({
            Bucket: config.tracksBucketName,
            Delete: { Objects: objects }
        }).promise();
    } catch (error) {
        throw new DeleteTrackS3Object(rm.FAIL_DELETE_S3_TRACK_AUDIO_AND_IMAGE_OBJECT);
    }
};

export default deleteS3AudioAndImage;