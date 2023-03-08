import { rm } from '../../../global/constants';
import { GetVocalListFail } from '../../../global/middlewares/error/errorInstance';
import { getVocals } from '../repository';


function getCondition (trackSearching: boolean, categList: string[]) {

    const trueReturn = { AND: [ { category: { hasSome: categList } }, { isSelected: false } ] };
    const falseReturn = { category: { hasSome: categList } };

    const result = ( trackSearching ) ? trueReturn : falseReturn;
    return result;

};


const getVocalList = async (categ: string[], isSelected: string, page: number, limit: number) => {

    try {

        const trackSearching = (isSelected === 'True');  //~ true -> 휴면계정 아닌 보컬(isSelected=false), false -> 휴면계정 상관없이 모두 다 
        
        const trackSearchingCondition = getCondition(trackSearching, categ);
        

        const result = await getVocals(trackSearchingCondition, page, limit);
        if (!result) throw new GetVocalListFail(rm.GET_VOCAL_LIST_FAIL);
        

        return result;

    } catch (error) {

        throw error;
    
    }

};


const VocalService = {

    getVocalList

};


export default VocalService;