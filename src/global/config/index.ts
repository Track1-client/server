import dotenv from "dotenv";
import { Algorithm } from 'jsonwebtoken';

// Set the NODE_ENV to 'development' by default
//process.env.NODE_ENV = process.env.NODE_ENV || "development";

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
  
  tracksBucketName: process.env.S3_BUCKET_TRACKS as string,                        //* Image + Audio
  profileImageBucketName: process.env.S3_BUCKET_PROFILE as string,                 //* Image
  commentsBucketName: process.env.S3_BUCKET_COMMENT as string,                     //* Audio 
  producerPortfolioBucketName: process.env.S3_BUCKET_PRODUCER_PORTFOLIO as string, //* Image + Audio
  vocalPortfolioBucketName: process.env.S3_BUCKET_VOCAL_PORTFOLIO as string,       //* Image + Audio

  defaultUserProfileImage: process.env.S3_DEFAULT_USER_IMAGE as string,                 //* default user image file
  defaultVocalPortfolioImage: process.env.S3_DEFAULT_VOCAL_PORTFOLIO_IMAGE as string,   //* default vocal portfolio image
  defaultJacketAndProducerPortfolioImage: process.env.S3_DEFUALT_JACKET_PRODUCER_PORTFOLIO_IMAGE as string, //* default beat jacket + producer potfolio image
  track1EmailImage: process.env.S3_TRACK1_EMAIL_IMAGE as string, //* user-join & reset-password email 

  //? Slack Webhook
  slackAlarm: process.env.SLACK_ALARM_URI as string,

  //? SMTP mail
  mailUser: process.env.EMAIL_USER as string,
  mailPassword: process.env.EMAIL_PASSWORD as string,
};