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


        //* DB ????????????
        const newPortfolioAudio = ( fileData.audioFileKey ) ? fileData.audioFileKey : isValidPortfolio.portfolioFile;  //& ????????? ????????? ???????????? ?????? ???????????????key???, ????????? ?????? ???????????????key???
        const newPortfolioImage = ( fileData.jacketImageKey ) ? fileData.jacketImageKey : config.defaultJacketAndProducerPortfolioImage; //& ????????? ????????? ???????????? ?????? ???????????????key???, ????????? ?????? ?????????        
        
        const data = await updateProducerPortfolioById(portfolioDTO, portfolioId, userId, String(newPortfolioAudio), String(newPortfolioImage));
        if (!data) throw new UpdateProducerPortfolioFail(rm.UPDATE_PRODUCER_PORTFOLIO_FAIL);


        //* S3 ?????? ??????
        const portfolioAudio = ( fileData.audioFileKey ) ? isValidPortfolio.portfolioFile : false;  //& ????????? ????????? ???????????? ??????, ?????? ???????????? ??????????????? ?????? 
        const portfolioImage = isValidPortfolio.portfolioImage; //& ????????? ????????? ???????????? ??????, ?????? ???????????? ??????????????? ?????? / ????????? ?????? ?????? ?????????????????? ????????? ?????? ?????? ????????? ????????? ?????? ?????? 
        
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

        //& ?????? ????????? ??????????????? ??????
        const currentTitle = await getProducerPortfolioTitleByUserId(Number(titleDTO.userId));
        if (currentTitle?.id !== oldId || titleDTO.tableName !== 'producer') throw new InvalidProducerTitlePortfolio(rm.INVALID_USER_TITLE);


        const prismaResult = await prisma.$transaction(async ($transaction) => {

            //& ?????? ????????? ??????????????? ????????????
            const oldData = await producerTitleRepository.updateOldTitle(Number(titleDTO.userId), oldId, $transaction);
            if (!oldData) throw new UpdateProducerOldTitleFail(rm.UPDATE_PRODUCER_OLD_TITLE_FAIL);
            
            //& ?????? ????????? ??????????????? ????????????
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


        await deleteProducerPortfolioByUserId(isValidPortfolio.producerId, isValidPortfolio.id); //! DB ?????? 
        await deleteS3ProducerPortfolioAudioAndImage(isValidPortfolio.portfolioFile, isValidPortfolio.portfolioImage);  //! S3 ?????? ?????? 


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