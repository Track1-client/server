export default interface BeatUpdateDTO {
    userId: number;
    tableName: string;
    beatId: number;
    title: string;
    category: string;
    introduce: string;
    keyword: string[];
};