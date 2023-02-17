import config from '../../../../config';

const getImageFileKey = (myfiles: any) => {
    //* 재킷이미지 없는 경우 -> default jacketImage로 설정
    const jacketImageKey = !("jacketImage" in myfiles) ? 
    config.defaultJacketAndProducerPortfolioImage : myfiles['jacketImage'][0]['key'] as string;
    
};

export default getImageFileKey;