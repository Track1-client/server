import { GetBeatsFail } from './../../../middlewares/error/errorInstance';
import multipartS3 from '../../../../infra/aws/s3MultipartConfig';
import { rm } from '../../../constants';

//! key 값을 통해 객체의 signedURL 받아오기 
const getS3OneImageObject = async(objectParams: any) => {
    const result = await multipartS3
                        .headObject(objectParams)
                        .promise()
                        .then(async (data) => {
                            const objUrl = multipartS3.getSignedUrl('getObject', objectParams);
                            return objUrl;
                        })
                        .catch((error) => {
                            if (error.code === 'NotFound') throw new GetBeatsFail(rm.S3_CANNOT_FIND_IMAGE_FILE_OBJECT);
                        });

    return result;
};

export default getS3OneImageObject;