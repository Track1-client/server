import { NotVocal } from './../../../global/middlewares/error/errorInstance/track/beat/NotVocal';
import { PortfolioCreateDTO, VocalPortfolioCreateReturnDTO } from '../interfaces';
import { rm } from '../../../global/constants';
import { createVocalPortfolioByUserId, findVocalPortfolioNumberByUserId, findVocalPortfolioTitleById } from '../repository';
import { UploadVocalPortfolioFail } from '../../../global/middlewares/error/errorInstance';

const createVocalPortfolio = async(portfolioDTO: PortfolioCreateDTO, tableName: string, userId: number, files: any) => {
    try {
        if (tableName !== 'vocal') throw new NotVocal(rm.NOT_VOCAL);
        
        const getPortfolioNumber = await findVocalPortfolioNumberByUserId(userId);
        const isTitle = ( !getPortfolioNumber ) ? true : false;
        
        const portfolio = await createVocalPortfolioByUserId(portfolioDTO, userId, isTitle, files.audioFileKey, files.jacketImageKey);
        if (!portfolio) throw new UploadVocalPortfolioFail(rm.UPLOAD_VOCAL_PORTFOLIO_FAIL);
        
        const getTitle = await findVocalPortfolioTitleById(userId);

        const result: VocalPortfolioCreateReturnDTO = {
            vocalPortfolioId: portfolio.id,
            vocalTitleId: getTitle?.id as number,
        };  
        return result;
    } catch (error) {
        throw error;
    }
};



const VocalService = {
    createVocalPortfolio,
};

export default VocalService;