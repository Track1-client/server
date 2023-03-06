export default interface GetOneBeatReturnDTO {
    beatId: number;
    jacketImage: string;
    beatWavFile: string;
    title: string;
    producerName: string;
    producerId: number;
    producerProfileImage: string;
    introduce: string;
    keyword: string[];
    category: string;
    isMe: boolean,
    wavFileLength: number;
    isClosed: boolean;
};