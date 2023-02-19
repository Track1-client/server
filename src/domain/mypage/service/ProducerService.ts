import { rm } from '../../../global/constants';
import { NotProducer, UploadProducerPortfolioFail } from '../../../global/middlewares/error/errorInstance';
import { PortfolioCreateDTO, ProducerPortfolioCreateReturnDTO } from '../interfaces';
import { createProducerPortfolioByUserId, getProducerPortfolioNumberByUserId, getProducerPortfolioTitleById } from '../repository';

const createProducerPortfolio = async(portfolioDTO: PortfolioCreateDTO, tableName: string, userId: number, files: any) => {
    try {
        if (tableName !== 'producer') throw new NotProducer(rm.NOT_PRODUCER);
        
        const getPortfolioNumber = await getProducerPortfolioNumberByUserId(userId);
        const isTitle = ( !getPortfolioNumber ) ? true : false;
        
        const portfolio = await createProducerPortfolioByUserId(portfolioDTO, userId, isTitle, files.audioFileKey, files.jacketImageKey);
        if (!portfolio) throw new UploadProducerPortfolioFail(rm.UPLOAD_PRODUCER_PORTFOLIO_FAIL);

        const getTitle = await getProducerPortfolioTitleById(userId);

        const result: ProducerPortfolioCreateReturnDTO = {
            producerPortfolioId: portfolio.id,
            producerTitleId: getTitle?.id as number,
        };  
        return result;
    } catch (error) {
        throw error;
    }
};

const ProducerService = {
    createProducerPortfolio,
};

export default ProducerService;