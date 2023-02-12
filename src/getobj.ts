import config from './global/config';
import multipartS3 from './infra/aws/s3MultipartConfig';

//* 버킷 목록 가져오기
const s3func = async() => {
     // 해당 버킷의 내용물(객체)들을 얻어와 저장
    const listedObjects = await multipartS3.listObjectsV2({ Bucket: config.tracksBucketName }).promise();

   // ... 내용물이 있다면
    const deleteParams = {
        Bucket: config.tracksBucketName,
        Delete: { Objects: [] },
    };
    const file = 'https://track-list-bucket.s3.ap-northeast-2.amazonaws.com/audio%2F1676195896542-%25E1%2584%2580%25E1%2585%25A9%25E1%2584%2585%25E1%2585%25A2%2520Dive%2520Into%2520You.mp3';
    const fileName = decodeURI(file);
    console.log(fileName);
    console.log(listedObjects);
    // await multipartS3.deleteObject({
    //     Bucket: config.tracksBucketName,
    //     Key: 'audio/1676192997308-고래 Dive Into You.mp3'
    // }).promise();
};

s3func();