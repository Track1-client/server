import config from '../../../global/config';
import prisma from '../../../global/config/prismaClient';
import { rm } from '../../../global/constants';
import { InvalidProducerPortfolio, InvalidProducerTitlePortfolio, NotProducer, UpdateProducerNewTitleFail, UpdateProducerOldTitleFail, UpdateProducerPortfolioFail, UploadProducerPortfolioFail } from '../../../global/middlewares/error/errorInstance';
import deleteS3ProducerPortfolioAudioAndImage from '../../../global/modules/S3Object/delete/deleteOneProducerPortfolio';
import updateS3ProducerPortfolioAudioAndImage from '../../../global/modules/S3Object/update/updateOneProducerPortfolio';
import { PortfolioCreateDTO, ProducerPortfolioCreateReturnDTO, PortfolioDeleteDTO, ProducerPortfolioDeleteReturnDTO, PortfolioUpdateDTO, ProducerPortfolioUpdateReturnDTO, TitleUpdateDTO, TitleUpdateReturnDTO } from '../interfaces';
import { createProducerPortfolioByUserId, deleteProducerPortfolioByUserId, getProducerPortfolioByUserId, getProducerPortfolioNumberByUserId, getProducerPortfolioTitleByUserId, updateNewTitleProducerPortfolio, updateOldTitleProducerPortfolio, updateProducerPortfolioById } from '../repository';
import ProducerTitleRepository from '../repository/PorudcerTitleRepository';


const producerTitleRepository = new ProducerTitleRepository();


const createProducerPortfolio = async (portfolioDTO: PortfolioCreateDTO, tableName: string, userId: number, files: any) => {

    try {

        if (tableName !== 'producer') throw new NotProducer(rm.NOT_PRODUCER);
        
        const getPortfolioNumber = await getProducerPortfolioNumberByUserId(userId);
        const isTitle = ( !getPortfolioNumber ) ? true : false;
        

        const portfolio = await createProducerPortfolioByUserId(portfolioDTO, userId, isTitle, files.audioFileKey, files.jacketImageKey);
        if (!portfolio) throw new UploadProducerPortfolioFail(rm.UPLOAD_PRODUCER_PORTFOLIO_FAIL);

        const getTitle = await getProducerPortfolioTitleByUserId(userId);

        
        const result: ProducerPortfolioCreateReturnDTO = {

            producerPortfolioId: portfolio.id,
            producerTitleId: getTitle?.id as number

        };  

        return result;

    } catch (error) {

        throw error;

    }

};


const updateProducerPortfolio = async (portfolioId: number, tableName: string, userId: number, portfolioDTO: PortfolioUpdateDTO, fileData: any) => {
    
    try {

        const isValidPortfolio = await getProducerPortfolioByUserId(userId, portfolioId);
        if (!isValidPortfolio || tableName !== 'producer') throw new InvalidProducerPortfolio(rm.INVALID_PRODUCER_PORTFOLIO);


        //* DB 업데이트
        const newPortfolioAudio = ( fileData.audioFileKey ) ? fileData.audioFileKey : isValidPortfolio.portfolioFile;  //& 수정할 오디오 존재하면 해당 오디오파일key값, 아니면 기존 오디오파일key값
        const newPortfolioImage = ( fileData.jacketImageKey ) ? fileData.jacketImageKey : config.defaultJacketAndProducerPortfolioImage; //& 수정할 이미지 존재하면 해당 이미지파일key값, 아니면 기본 이미지        
        
        const data = await updateProducerPortfolioById(portfolioDTO, portfolioId, userId, String(newPortfolioAudio), String(newPortfolioImage));
        if (!data) throw new UpdateProducerPortfolioFail(rm.UPDATE_PRODUCER_PORTFOLIO_FAIL);


        //* S3 객체 삭제
        const portfolioAudio = ( fileData.audioFileKey ) ? isValidPortfolio.portfolioFile : false;  //& 수정할 오디오 존재하는 경우, 기존 게시글의 오디오객체 삭제 
        const portfolioImage = isValidPortfolio.portfolioImage; //& 수정할 이미지 존재하는 경우, 기존 게시글의 이미지객체 삭제 / 이미지 없는 경우 기본이미지로 바꾸기 위해 기존 게시글 이미지 객체 삭제 
        
        await updateS3ProducerPortfolioAudioAndImage(portfolioAudio as string, portfolioImage as string);  


        const result: ProducerPortfolioUpdateReturnDTO = {

            producerPortfolioId: data.id,
            producerId: data.producerId

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const updateProducerTitle = async (titleDTO: TitleUpdateDTO, oldId: number, newId: number) => {

    try {

        //& 현재 타이틀 포트폴리오 확인
        const currentTitle = await getProducerPortfolioTitleByUserId(Number(titleDTO.userId));
        if (currentTitle?.id !== oldId || titleDTO.tableName !== 'producer') throw new InvalidProducerTitlePortfolio(rm.INVALID_USER_TITLE);


        const prismaResult = await prisma.$transaction(async ($transaction) => {

            //& 현재 타이틀 포트폴리오 업데이트
            const oldData = await producerTitleRepository.updateOldTitle(Number(titleDTO.userId), oldId, $transaction);
            if (!oldData) throw new UpdateProducerOldTitleFail(rm.UPDATE_PRODUCER_OLD_TITLE_FAIL);
            
            //& 바뀔 타이틀 포트폴리오 업데이트
            const newData = await producerTitleRepository.updateNewTitle(Number(titleDTO.userId), newId, $transaction);
            if (!newData) throw new UpdateProducerNewTitleFail(rm.UPDATE_PRODUCER_NEW_TITLE_FAIL);

            return { oldData, newData };
        });


        const result: TitleUpdateReturnDTO = {

            oldTitleId: prismaResult.oldData.id,
            newTitleId: prismaResult.newData.id

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const deleteProducerPortfolio = async (portfolioDTO: PortfolioDeleteDTO, portfolioId: number) => {

    try {

        const isValidPortfolio = await getProducerPortfolioByUserId(Number(portfolioDTO.userId), portfolioId);
        if (!isValidPortfolio || portfolioDTO.tableName !== 'producer') throw new InvalidProducerPortfolio(rm.INVALID_PRODUCER_PORTFOLIO);


        await deleteProducerPortfolioByUserId(isValidPortfolio.producerId, isValidPortfolio.id); //! DB 삭제 
        await deleteS3ProducerPortfolioAudioAndImage(isValidPortfolio.portfolioFile, isValidPortfolio.portfolioImage);  //! S3 객체 삭제 


        const result: ProducerPortfolioDeleteReturnDTO = {

            producerId: isValidPortfolio.producerId
            
        };

        return result;

    } catch (error) {

        throw error;

    }

};


const ProducerService = {

    createProducerPortfolio,
    updateProducerPortfolio,
    updateProducerTitle,
    deleteProducerPortfolio,

};


export default ProducerService;