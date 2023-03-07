import { InformationGetDTO, InformationProducerGetReturnDTO, InformationVocalGetReturnDTO } from '../interfaces';
import { getProducerProfileById, getVocalProfileById } from '../../profile/repository';


const getUserInfo = async (infoDTO: InformationGetDTO, page: number, limit: number) => {

    try {

        let data;

        if (infoDTO.tableName === 'producer') {

            data = await getProducerProfileById(Number(infoDTO.userId), limit, page);
            
            const result: InformationProducerGetReturnDTO = {

                whoamI: infoDTO.tableName,
                producerProfile: data.profileDTO,
                producerPortfolio: data.portfolioList

            };

            return result;
        } 
        else if (infoDTO.tableName === 'vocal') {

            data = await getVocalProfileById(Number(infoDTO.userId), limit, page);

            const result: InformationVocalGetReturnDTO = {

                whoamI: infoDTO.tableName,
                vocalProfile: data.profileDTO,
                vocalPortfolio: data.portfolioList

            };
            
            return result;
        }

    } catch (error) {

        throw error;

    }

};


const MypageService = {

    getUserInfo,

};


export default MypageService;