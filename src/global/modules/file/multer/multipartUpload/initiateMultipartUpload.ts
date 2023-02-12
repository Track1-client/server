import { CreateMultipartUploadCommand } from '@aws-sdk/client-s3';
import s3 from '../../../../../infra/aws/s3Config';
import config from '../../../../config';

const initParams = {
    //Key: config.key
}

async function initiateMultipartUpload(){
    try{
        //await s3.send(new CreateMultipartUploadCommand(initParams))
    }catch(err){
        // error handler function here
    }
}