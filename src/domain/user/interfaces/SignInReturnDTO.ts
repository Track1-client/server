export default interface SignInReturnDTO {

    tableName: string;
    userId: number;
    redisKey: string;            //* Redis에 저장할 key 값을 ':'로 연결해 반환
    
};
