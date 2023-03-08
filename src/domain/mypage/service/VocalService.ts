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


        //* DB 업데이트
        const newPortfolioAudio = ( fileData.audioFileKey ) ? fileData.audioFileKey : isValidPortfolio.portfolioFile;  //& 수정할 오디오 존재하면 해당 오디오파일key값, 아니면 기존 오디오파일key값
        const newPortfolioImage = ( fileData.jacketImageKey ) ? fileData.jacketImageKey : config.defaultVocalPortfolioImage; //& 수정할 이미지 존재하면 해당 이미지파일key값, 아니면 기본 이미지        
        
        const data = await updateVocalPortfolioById(portfolioDTO, portfolioId, userId, String(newPortfolioAudio), String(newPortfolioImage));
        if (!data) throw new UpdateVocalPortfolioFail(rm.UPDATE_VOCAL_PORTFOLIO_FAIL);


        //* S3 객체 삭제
        const portfolioAudio = ( fileData.audioFileKey ) ? isValidPortfolio.portfolioFile : false;  //& 수정할 오디오 존재하는 경우, 기존 게시글의 오디오객체 삭제 
        const portfolioImage = isValidPortfolio.portfolioImage; //& 수정할 이미지 존재하는 경우, 기존 게시글의 이미지객체 삭제 / 이미지 없는 경우 기본이미지로 바꾸기 위해 기존 게시글 이미지 객체 삭제 
        
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

        //& 현재 타이틀 포트폴리오 확인
        const currentTitle = await getVocalPortfolioTitleByUserId(Number(titleDTO.userId));
        if (currentTitle?.id !== oldId || titleDTO.tableName !== 'vocal') throw new InvalidVocalTitlePortfolio(rm.INVALID_USER_TITLE);
        

        const prismaResult = await prisma.$transaction(async ($transaction) => {

            //& 현재 타이틀 포트폴리오 업데이트
            const oldData = await vocalTitleRepository.updateOldTitle(Number(titleDTO.userId), oldId, $transaction);
            if (!oldData) throw new UpdateVocalOldTitleFail(rm.UPDATE_VOCAL_OLD_TITLE_FAIL);
            
            //& 바뀔 타이틀 포트폴리오 업데이트
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


        await deleteVocalPortfolioByUserId(isValidPortfolio.vocalId, isValidPortfolio.id); //! DB 삭제 
        await deleteS3VocalPortfolioAudioAndImage(isValidPortfolio.portfolioFile, isValidPortfolio.portfolioImage);  //! S3 객체 삭제 


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