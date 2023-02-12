import multipartS3 from './infra/aws/s3MultipartConfig';

//* 버킷 목록 가져오기
const s3func = async() => {
    await multipartS3
    .listBuckets() // s3 버킷 정보 가져오기
    .promise() // 메소드를 프로미스 객체화
    .then((data) => {
        console.log('S3 : ', JSON.stringify(data, null, 2));
    });
};

s3func();