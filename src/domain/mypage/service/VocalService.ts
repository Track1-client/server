import { NotVocal } from '../../../global/middlewares/error/errorInstance/tracks/beat/NotVocal';
import { PortfolioCreateDTO, PortfolioDeleteDTO, PortfolioUpdateDTO, TitleUpdateDTO, TitleUpdateReturnDTO, VocalPortfolioCreateReturnDTO, VocalPortfolioDeleteReturnDTO, VocalPortfolioUpdateReturnDTO } from '../interfaces';
import { rm } from '../../../global/constants';
import config from '../../../global/config';
import { deleteVocalPortfolioByUserId, getVocalPortfolioByUserId, getVocalPortfolioNumberByUserId, getVocalPortfolioTitleByUserId, updateNewTitleVocalPortfolio, updateOldTitleVocalPortfolio, updateVocalPortfolioById } from '../repository';
import { InvalidVocalPortfolio, InvalidVocalTitlePortfolio, UpdateVocalNewTitleFail, UpdateVocalOldTitleFail, UpdateVocalPortfolioFail, UploadVocalPortfolioFail } from '../../../global/middlewares/error/errorInstance';
import deleteS3VocalPortfolioAudioAndImage from '../../../global/modules/S3Object/delete/deleteOneVocalPortfolio';
import updateS3VocalPortfolioAudioAndImage from '../../../global/modules/S3Object/update/updateOneVocalPortfolio';
import prisma from '../../../global/config/prismaClient';
import VocalTitleRepository from '../repository/VocalTitleRepository';
import VocalPortfolioOrderRepository from '../repository/VocalPortfolioOrderRepository';


const vocalTitleRepository = new VocalTitleRepository();
const vocalPortfolioOrderRepository = new VocalPortfolioOrderRepository();


const createVocalPortfolio = async (portfolioDTO: PortfolioCreateDTO, tableName: string, userId: number, files: any) => {

    try {

        if (tableName !== 'vocal') throw new NotVocal(rm.NOT_VOCAL);
        
        const getPortfolioNumber = await getVocalPortfolioNumberByUserId(userId);
        const isTitle = ( !getPortfolioNumber ) ? true : false;
        

        const prismaResult = await prisma.$transaction(async ($transaction) => {
            
            return await vocalPortfolioOrderRepository.createVocalPortfolio(portfolioDTO, userId, isTitle, files.audioFileKey, files.jacketImageKey, $transaction)
                                        .then(async (portfolio) => {

                                            await vocalPortfolioOrderRepository.upsertVocalOrder(portfolio.vocalId, 'portfolio', portfolio.id, $transaction); 
                                            return portfolio;
                                            
                                        })
                                        .catch((error) => { throw new UploadVocalPortfolioFail(rm.UPLOAD_VOCAL_PORTFOLIO_FAIL) })

        });

        const getTitle = await getVocalPortfolioTitleByUserId(userId);


        const result: VocalPortfolioCreateReturnDTO = {

            vocalPortfolioId: prismaResult.id,
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


        //* DB ????????????
        const newPortfolioAudio = ( fileData.audioFileKey ) ? fileData.audioFileKey : isValidPortfolio.portfolioFile;  //& ????????? ????????? ???????????? ?????? ???????????????key???, ????????? ?????? ???????????????key???
        const newPortfolioImage = ( fileData.jacketImageKey ) ? fileData.jacketImageKey : config.defaultVocalPortfolioImage; //& ????????? ????????? ???????????? ?????? ???????????????key???, ????????? ?????? ?????????        
        
        const data = await updateVocalPortfolioById(portfolioDTO, portfolioId, userId, String(newPortfolioAudio), String(newPortfolioImage));
        if (!data) throw new UpdateVocalPortfolioFail(rm.UPDATE_VOCAL_PORTFOLIO_FAIL);


        //* S3 ?????? ??????
        const portfolioAudio = ( fileData.audioFileKey ) ? isValidPortfolio.portfolioFile : false;  //& ????????? ????????? ???????????? ??????, ?????? ???????????? ??????????????? ?????? 
        const portfolioImage = isValidPortfolio.portfolioImage; //& ????????? ????????? ???????????? ??????, ?????? ???????????? ??????????????? ?????? / ????????? ?????? ?????? ?????????????????? ????????? ?????? ?????? ????????? ????????? ?????? ?????? 
        
        await updateS3VocalPortfolioAudioAndImage(portfolioAudio as string, portfolioImage as string);  



        const result: VocalPortfolioUpdateReturnDTO = {

            vocalPortfolioId: data.id,
            vocalId: data.vocalId

        };

        return result;

    } catch (error) {

        throw error;

    }

};


const updateVocalTitle = async (titleDTO: TitleUpdateDTO, oldId: number, newId: number) => {

    try {

        //& ?????? ????????? ??????????????? ??????
        const currentTitle = await getVocalPortfolioTitleByUserId(Number(titleDTO.userId));
        if (currentTitle?.id !== oldId || titleDTO.tableName !== 'vocal') throw new InvalidVocalTitlePortfolio(rm.INVALID_USER_TITLE);
        

        const prismaResult = await prisma.$transaction(async ($transaction) => {

            //& ?????? ????????? ??????????????? ????????????
            const oldData = await vocalTitleRepository.updateOldTitle(Number(titleDTO.userId), oldId, $transaction);
            if (!oldData) throw new UpdateVocalOldTitleFail(rm.UPDATE_VOCAL_OLD_TITLE_FAIL);
            
            //& ?????? ????????? ??????????????? ????????????
            const newData = await vocalTitleRepository.updateNewTitle(Number(titleDTO.userId), newId, $transaction);
            if (!newData) throw new UpdateVocalNewTitleFail(rm.UPDATE_VOCAL_NEW_TITLE_FAIL);

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


const deleteVocalPortfolio = async (portfolioDTO: PortfolioDeleteDTO, portfolioId: number) => {

    try {

        const isValidPortfolio = await getVocalPortfolioByUserId(Number(portfolioDTO.userId), portfolioId);
        if (!isValidPortfolio || portfolioDTO.tableName !== 'vocal') throw new InvalidVocalPortfolio(rm.INVALID_VOCAL_PORTFOLIO);


        await deleteVocalPortfolioByUserId(isValidPortfolio.vocalId, isValidPortfolio.id); //! DB ?????? 
        await deleteS3VocalPortfolioAudioAndImage(isValidPortfolio.portfolioFile, isValidPortfolio.portfolioImage);  //! S3 ?????? ?????? 


        const result: VocalPortfolioDeleteReturnDTO = {

            vocalId: isValidPortfolio.vocalId
            
        };
        
        return result;

    } catch (error) {

        throw error;

    }

};


const VocalService = {

    createVocalPortfolio,
    updateVocalPortfolio,
    updateVocalTitle,
    deleteVocalPortfolio,

};


export default VocalService;