import PortfolioDTO from './PortfolioDTO';
import ProfileDTO from './ProducerProfileDTO';


export default interface ProducerProfileGetReturnDTO {

    whoamI: string;
    isMe: boolean;
    producerProfile: ProfileDTO;
    producerPortfolio: PortfolioDTO[];
    
};