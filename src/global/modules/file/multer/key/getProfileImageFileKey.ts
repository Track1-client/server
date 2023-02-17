import config from '../../../../config';

const getProfileImageFileKey = (imageFileObject: any) => {
    //* 프로필이미지 없는 경우
    const imageFileKey = (!imageFileObject) ? config.defaultUserProfileImage : imageFileObject['key'] as string;
    
    return imageFileKey;
};

export default getProfileImageFileKey;