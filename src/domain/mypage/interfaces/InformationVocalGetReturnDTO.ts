import { PortfolioDTO, ProducerProfileDTO } from '../../profile/interfaces';


export default interface InformationVocalGetReturnDTO {

    whoamI: string;
    vocalProfile: ProducerProfileDTO;
    vocalPortfolio: PortfolioDTO[];
    
};