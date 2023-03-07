import { PortfolioDTO, ProducerProfileDTO } from '../../profile/interfaces';


export default interface InformationProducerGetReturnDTO {

    whoamI: string;
    producerProfile: ProducerProfileDTO;
    producerPortfolio: PortfolioDTO[];
    
};