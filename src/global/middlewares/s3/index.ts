import uploadS3CommentFile from './comments';
import uploadS3ProducerPortfolioFile from './producerPortfolio';
import uploadS3ProfileImageFile from './profileImage';
import updateS3TracksFile from './tracks/updateTracks';
import uploadS3TracksFile from './tracks/uploadTracks';
import uploadS3VocalPortfolioFile from './vocalPortfolio';

const s3UploadeMiddleware = {
    uploadS3CommentFile,
    uploadS3ProducerPortfolioFile,
    uploadS3ProfileImageFile,
    uploadS3TracksFile,
    uploadS3VocalPortfolioFile,
    updateS3TracksFile,
};

export default s3UploadeMiddleware;