import { DeleteProducerPortfolioS3Object, UpdateProducerPortfolioFail } from './../../../middlewares/error/errorInstance';
import multipartS3 from '../../../../infra/aws/s3MultipartConfig';
import config from '../../../config';
import { rm } from '../../../constants';


//! S3 버킷에서 게시글의 오디오파일객체, 자켓이미지객체 삭제하기 
const updateS3ProducerPortfolioAudioAndImage = async (audioFile: string, imageFile: string) => {

    try {

        let keyList = [];

        if (audioFile) keyList.push({ Key: audioFile });
        if (imageFile && imageFile !== config.defaultJacketAndProducerPortfolioImage) keyList.push({ Key: imageFile });
        

        try {

            if (keyList.length !== 0) {

                await multipartS3
                        .deleteObjects
                            ({
                                Bucket: config.producerPortfolioBucketName,
                                Delete: { Objects: keyList },
                            })
                        .promise();
                        
            }

        } catch (error) {

            throw new DeleteProducerPortfolioS3Object(rm.DELETE_S3_PRODUCER_PORTFOLIO_AUDIO_AND_IMAGE_OBJECT_FAIL);

        }

    } catch (error) {

        throw error;

    }

};


export default updateS3ProducerPortfolioAudioAndImage;