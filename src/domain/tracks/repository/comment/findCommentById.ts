import config from '../../../../global/config';
import prisma from '../../../../global/config/prismaClient';
import { getS3OneBeatObject, getS3OneImageObject } from '../../../../global/modules/S3Object/get';
import { BeatGetDTO, CommentGetReturnDTO } from '../../interfaces';


function objectParams_url(bucket: string, Key: string) {

    const bucketName = (bucket === 'comment') ? config.commentsBucketName : config.profileImageBucketName;

    return {

        Bucket: bucketName,
        Key: Key

    };

};


const findCommentById = async(beatDTO: BeatGetDTO, beatId: number, page: number, limit: number) => {

    try {

        const dataList = await prisma.comment
            .findMany({
                where: { beatId },
                select: { id: true, content: true, duration: true, commentFile: true, 
                    Vocal: { select: { id: true, name: true, vocalImage: true }}},
                skip: (page-1)*limit,
                take: limit,
            })
            .then(async (commentList) => {

                return await Promise.all(commentList.map(async (comment) => {

                    const commentURL = await getS3OneBeatObject(objectParams_url('comment', comment.commentFile));
                    const vocalProfileURL = (comment.Vocal.vocalImage === config.defaultUserProfileImage) ? 
                                        comment.Vocal.vocalImage: await getS3OneImageObject(objectParams_url('profile', comment.Vocal.vocalImage));
                                        
                    const isMe = (comment.Vocal.id === Number(beatDTO.userId) && beatDTO.tableName === 'vocal') ? true : false;  

                    const result: CommentGetReturnDTO= {

                        commentId: comment.id,
                        vocalWavFile: commentURL as string,
                        vocalName: comment.Vocal.name,
                        vocalProfileImage: vocalProfileURL as string,
                        comment: comment.content as string,
                        isMe,
                        vocalWavFileLength: comment.duration,

                    };

                    return result;

                }))
            });

        return dataList;

    } catch(error) {

        throw error;

    }

};


export default findCommentById;