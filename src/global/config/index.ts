import dotenv from "dotenv";
import { Algorithm } from 'jsonwebtoken';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT as string, 10) as number,
  env: process.env.NODE_ENV as string,

  //? 데이터베이스
  database: process.env.DATABASE_URL as string,
  redisPort: process.env.REDIS_PORT as unknown as number,
  redisHost: process.env.REDIS_HOST as string,
  redisPassword: process.env.REDIS_PASSWORD as string, 

  //? JWT
  jwtSecret: process.env.JWT_SECRET as string,
  jwtAlgo: process.env.JWT_ALGO as Algorithm,
  jwtAccessExp: process.env.JWT_ACCESS_TOKEN_EXPIRE as string,
  jwtRefreshExp: process.env.JWT_REFRESH_TOKEN_EXPIRE as string,

  //? AWS
  s3AccessKey: process.env.S3_ACCESS_KEY as string,
  s3SecretKey: process.env.S3_SECRET_KEY as string,
  wavBucketName: process.env.S3_BUCKET_WAV_FILE as string,                //* only wav file
  imageBucketName: process.env.S3_BUCKET_IMAGE_FILE as string,            //* only image file
  bothWavImageBucketName: process.env.S3_BUCKET_WAV_AND_IMAGE as string,  //* both wav and image file into one object 
  defaultUserImage2: process.env.S3_DEFAULT_USER_IMAGE2 as string, //* default user image file
  defaultVocalPortfolioImage: process.env.S3_DEFAULT_VOCAL_PORTFOLIO_IMAGE as string,  //* default vocal portfolio image
  defaultJacketAndProducerPortfolioImage: process.env.S3_DEFUALT_JACKET_PRODUCER_PORTFOLIO_IMAGE as string, //* default beat jacket + producer potfolio image


  //? Slack Webhook
  slackAlarm: process.env.SLACK_ALARM_URI as string,
};