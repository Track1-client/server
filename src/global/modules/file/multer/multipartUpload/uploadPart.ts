import { UploadPartCommand } from '@aws-sdk/client-s3';
import s3 from '../../../../../infra/aws/s3Config';

function uploadPartParams (bucketName: string, key: string, body: any, UploadId: string, partNumber: number) {
    const params = {
        Key: key,
        Bucket: bucketName,
        Body: body,
        UploadId: UploadId, 
        PartNumber: partNumber
    };

    return params;
};

const uploadPart = async(bucketName: string, key: string, body: any, UploadId: string, partNumber: number) => {
    const params = uploadPartParams(bucketName, key, body, UploadId, partNumber);

    return new Promise(async(resolve, reject) => {
        try {
            let part = await s3.send(new UploadPartCommand(params));
            resolve({ PartNumber: partNumber, ETag: part.ETag });
        } catch (error) {
            reject({ partNumber, error });
        }
    });
};

export default uploadPart;