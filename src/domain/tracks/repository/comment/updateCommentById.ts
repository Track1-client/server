import getAudioDurationInSeconds from 'get-audio-duration';
import config from '../../../../global/config';
import prisma from '../../../../global/config/prismaClient';
import getS3OneBeatObject from '../../../../global/modules/S3Object/get/getOneBeat';
import { CommentUpdateDTO } from '../../interfaces';


function objectParams_url(audioKey: string) {

    return {

        Bucket: config.commentsBucketName,
        Key: audioKey

    };

};


const updateCommentById = async(commentDTO: CommentUpdateDTO, commentId: number, userId: number, audioKey: string) => {

    try {

        const audioSignedURL = await getS3OneBeatObject(objectParams_url(audioKey));   //! 객체의 signedURL 받아오기 

        const comment = await prisma.comment.update({

            data: {
                commentFile: audioKey,
                content: commentDTO.content,
                duration: await getAudioDurationInSeconds(audioSignedURL as string),
            },
    
            where: {
                vocalComment: {
                    id: commentId,
                    vocalId: userId,
                },
            },

            select: {
                commentFile: true, duration: true, content: true,
                Vocal: { select: { id: true, name: true } },
            },
        });
        
        return { comment, audioSignedURL };

    } catch(error) {

        throw error;

    }

};


export default updateCommentById;