import { NotVocal } from './../../../global/middlewares/error/errorInstance/track/beat/NotVocal';
import { PortfolioCreateDTO, PortfolioDeleteDTO, VocalPortfolioCreateReturnDTO, VocalPortfolioDeleteReturnDTO } from '../interfaces';
import { rm } from '../../../global/constants';
import { createVocalPortfolioByUserId, deleteVocalPortfolioByUserId, getVocalPortfolioByUserId, getVocalPortfolioNumberByUserId, getVocalPortfolioTitleById } from '../repository';
import { InvalidVocalPortfolio, UploadVocalPortfolioFail } from '../../../global/middlewares/error/errorInstance';
import deleteS3VocalPortfolioAudioAndImage from '../../../global/modules/S3Object/delete/deleteOneVocalPortfolio';

const createVocalPortfolio = async(portfolioDTO: PortfolioCreateDTO, tableName: string, userId: number, files: any) => {
    try {
        if (tableName !== 'vocal') throw new NotVocal(rm.NOT_VOCAL);
        
        const getPortfolioNumber = await getVocalPortfolioNumberByUserId(userId);
        const isTitle = ( !getPortfolioNumber ) ? true : false;
        
        const portfolio = await createVocalPortfolioByUserId(portfolioDTO, userId, isTitle, files.audioFileKey, files.jacketImageKey);
        if (!portfolio) throw new UploadVocalPortfolioFail(rm.UPLOAD_VOCAL_PORTFOLIO_FAIL);
        
        const getTitle = await getVocalPortfolioTitleById(userId);

        const result: VocalPortfolioCreateReturnDTO = {
            vocalPortfolioId: portfolio.id,
            vocalTitleId: getTitle?.id as number,
        };  
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteVocalPortfolio = async(portfolioDTO: PortfolioDeleteDTO, portfolioId: number) => {
    try {
        const isValidPortfolio = await getVocalPortfolioByUserId(Number(portfolioDTO.userId), portfolioId);
        if (!isValidPortfolio || portfolioDTO.tableName !== 'vocal') throw new InvalidVocalPortfolio(rm.INVALID_VOCAL_PORTFOLIO);

        await deleteS3VocalPortfolioAudioAndImage(isValidPortfolio.portfolioFile, isValidPortfolio.portfolioImage);  //! S3 객체 삭제 
        await deleteVocalPortfolioByUserId(isValidPortfolio.vocalId, isValidPortfolio.id); //! DB 삭제 

        const result: VocalPortfolioDeleteReturnDTO = {
            vocalId: isValidPortfolio.vocalId,
        };
        return result;
    } catch (error) {
        throw error;
    }
};

const VocalService = {
    createVocalPortfolio,
    deleteVocalPortfolio,
};

export default VocalService;