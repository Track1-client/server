import PortfolioDTO from './PortfolioDTO';
import ProfileDTO from './VocalProfileDTO';

export default interface VocalProfileGetReturnDTO {
    whoamI: string;
    isMe: boolean;
    vocalProfile: ProfileDTO;
    vocalPortfolio: PortfolioDTO[];
};