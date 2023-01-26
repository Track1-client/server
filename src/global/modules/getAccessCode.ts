//* 숫자/영문자 포함한 8자리의 문자열 생성
const randomAccessCode = (length=8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let accessCode = '';

    for (let i=0; i<length; i++) {
        accessCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return accessCode;
};

export default randomAccessCode;