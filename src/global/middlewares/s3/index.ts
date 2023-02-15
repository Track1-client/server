import uploadS3CommentFile from './comments';
import uploadS3ProducerPortfolioFile from './producerPortfolio';
import uploadS3ProfileImageFile from './profileImage';
import uploadS3TracksFile from './tracks/uploadTracks';
import uploadS3VocalPortfolioFile from './vocalPortfolio';

const s3UploadeMiddleware = {
    uploadS3CommentFile,
    uploadS3ProducerPortfolioFile,
    uploadS3ProfileImageFile,
    uploadS3TracksFile,
    uploadS3VocalPortfolioFile,
};

export default s3UploadeMiddleware;