import PortfolioDTO from './PortfolioDTO';
import ProfileDTO from './ProfileDTO';

export default interface ProducerProfileGetDTO {
    whoamI: string;
    isMe: boolean;
    producerProfile: ProfileDTO;
    producerPortfolio: PortfolioDTO[];
};