import { CreateMultipartUploadCommand } from '@aws-sdk/client-s3';
import s3 from '../../../../../infra/aws/s3Config';

function initParams (bucketName: string, key: string) {
    const params = {
        Key: key,
        Bucket: bucketName, 
    };

    return params;
};

const initiateMultipartUpload = async(bucketName: string, key: string) => {
    try{
        const params = initParams(bucketName, key);
        await s3.send(new CreateMultipartUploadCommand(params));  //! UploadId 반환
    }catch(err){
        throw err;
    }
};

export default initiateMultipartUpload;