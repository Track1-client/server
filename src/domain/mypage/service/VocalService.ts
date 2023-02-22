import { NotVocal } from './../../../global/middlewares/error/errorInstance/track/beat/NotVocal';
import { PortfolioCreateDTO, PortfolioDeleteDTO, PortfolioUpdateDTO, VocalPortfolioCreateReturnDTO, VocalPortfolioDeleteReturnDTO, VocalPortfolioUpdateReturnDTO } from '../interfaces';
import { rm } from '../../../global/constants';
import { createVocalPortfolioByUserId, deleteVocalPortfolioByUserId, getVocalPortfolioByUserId, getVocalPortfolioNumberByUserId, getVocalPortfolioTitleById, updateVocalPortfolioById } from '../repository';
import { InvalidVocalPortfolio, UpdateVocalPortfolioFail, UploadVocalPortfolioFail } from '../../../global/middlewares/error/errorInstance';
import deleteS3VocalPortfolioAudioAndImage from '../../../global/modules/S3Object/delete/deleteOneVocalPortfolio';
import updateS3VocalPortfolioAudioAndImage from '../../../global/modules/S3Object/update/updateOneVocalPortfolio';
import config from '../../../global/config';

const createVocalPortfolio = async (portfolioDTO: PortfolioCreateDTO, tableName: string, userId: number, files: any) => {
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

const updateVocalPortfolio = async (portfolioId: number, tableName: string, userId: number, portfolioDTO: PortfolioUpdateDTO, fileData: any) => {
    try {  
        const isValidPortfolio = await getVocalPortfolioByUserId(userId, portfolioId);
        if (!isValidPortfolio || tableName !== 'vocal') throw new InvalidVocalPortfolio(rm.INVALID_VOCAL_PORTFOLIO);

        //* S3 객체 삭제
        let portfolioAudio = ( fileData.audioFileKey ) ? isValidPortfolio.portfolioFile : false;  //& 수정할 오디오 존재하는 경우, 기존 게시글의 오디오객체 삭제 
        let portfolioImage = isValidPortfolio.portfolioImage; //& 수정할 이미지 존재하는 경우, 기존 게시글의 이미지객체 삭제 / 이미지 없는 경우 기본이미지로 바꾸기 위해 기존 게시글 이미지 객체 삭제 
        await updateS3VocalPortfolioAudioAndImage(portfolioAudio as string, portfolioImage as string);  

        //* DB 업데이트
        portfolioAudio = ( fileData.audioFileKey ) ? fileData.audioFileKey : isValidPortfolio.portfolioFile;  //& 수정할 오디오 존재하면 해당 오디오파일key값, 아니면 기존 오디오파일key값
        portfolioImage = ( fileData.jacketImageKey ) ? fileData.jacketImageKey : config.defaultVocalPortfolioImage; //& 수정할 이미지 존재하면 해당 이미지파일key값, 아니면 기본 이미지        
        const data = await updateVocalPortfolioById(portfolioDTO, portfolioId, userId, String(portfolioAudio), String(portfolioImage));
        if (!data) throw new UpdateVocalPortfolioFail(rm.UPDATE_VOCAL_PORTFOLIO_FAIL);

        const result: VocalPortfolioUpdateReturnDTO = {
            vocalPortfolioId: data.id,
            vocalId: data.vocalId,
        };
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteVocalPortfolio = async (portfolioDTO: PortfolioDeleteDTO, portfolioId: number) => {
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
    updateVocalPortfolio,
    deleteVocalPortfolio,
};

export default VocalService;