import { rm } from '../../../global/constants';
import { InvalidProducerPortfolio, NotProducer, UploadProducerPortfolioFail } from '../../../global/middlewares/error/errorInstance';
import deleteS3ProducerPortfolioAudioAndImage from '../../../global/modules/S3Object/delete/deleteOneProducerPortfolio';
import { PortfolioCreateDTO, ProducerPortfolioCreateReturnDTO, PortfolioDeleteDTO, ProducerPortfolioDeleteReturnDTO } from '../interfaces';
import { createProducerPortfolioByUserId, deleteProducerPortfolioByUserId, getProducerPortfolioByUserId, getProducerPortfolioNumberByUserId, getProducerPortfolioTitleById } from '../repository';

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

const deleteProducerPortfolio = async(portfolioDTO: PortfolioDeleteDTO, portfolioId: number) => {
    try {
        const isValidPortfolio = await getProducerPortfolioByUserId(Number(portfolioDTO.userId), portfolioId);
        if (!isValidPortfolio || portfolioDTO.tableName !== 'producer') throw new InvalidProducerPortfolio(rm.INVALID_PRODUCER_PORTFOLIO);

        await deleteS3ProducerPortfolioAudioAndImage(isValidPortfolio.portfolioFile, isValidPortfolio.portfolioImage);  //! S3 객체 삭제 
        await deleteProducerPortfolioByUserId(isValidPortfolio.producerId, isValidPortfolio.id); //! DB 삭제 

        const result: ProducerPortfolioDeleteReturnDTO = {
            producerId: isValidPortfolio.producerId,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const ProducerService = {
    createProducerPortfolio,
    deleteProducerPortfolio,
};

export default ProducerService;