import uploadS3CommentFile from './comments';
import uploadS3PortfolioFile from './producerPortfolio';
import uploadS3ProfileImageFile from './profileImage';
import uploadS3TracksFile from './track';
import uploadS3VocalPortfolioFile from './vocalPortfolio';

const s3UploadeMiddleware = {
    uploadS3CommentFile,
    uploadS3PortfolioFile,
    uploadS3ProfileImageFile,
    uploadS3TracksFile,
    uploadS3VocalPortfolioFile,
};

export default s3UploadeMiddleware;