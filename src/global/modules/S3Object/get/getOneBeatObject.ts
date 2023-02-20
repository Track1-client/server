import multipartS3 from '../../../../infra/aws/s3MultipartConfig';
import { rm } from '../../../constants';
import { BeatFileUploadFail } from '../../../middlewares/error/errorInstance';

//! key 값을 통해 객체의 signedURL 받아오기 
const getS3OneBeatObject = async(objectParams: any) => {
    const result = await multipartS3
                        .headObject(objectParams)
                        .promise()
                        .then(async (data) => {
                            const objUrl = multipartS3.getSignedUrl('getObject', objectParams);
                            return objUrl;
                        })
                        .catch((error) => {
                            if (error.code === 'NotFound') throw new BeatFileUploadFail(rm.S3_CANNOT_FIND_AUDIO_FILE_OBJEUPDATE_TRACK_FAILCT);
                        });

    return result;
};

export default getS3OneBeatObject;