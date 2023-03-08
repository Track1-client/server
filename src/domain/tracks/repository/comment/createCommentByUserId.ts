import prisma from '../../../../global/config/prismaClient';
import { CommentCreateDTO } from '../../interfaces';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import config from '../../../../global/config';
import getS3OneBeatObject from '../../../../global/modules/S3Object/get/getOneBeat';
import { Prisma } from '@prisma/client';


function objectParams_url(audioKey: string) {

    return {

        Bucket: config.commentsBucketName,
        Key: audioKey

    };

};


const createCommentByUserId = async(beatId: number, commentDTO: CommentCreateDTO, beatProducerId: number, userId: number, audioKey: string, transaction: Prisma.TransactionClient) => {
    
    try {

        const audioSignedURL = await getS3OneBeatObject(objectParams_url(audioKey));   //! 객체의 signedURL 받아오기 
        
        const data = await transaction.comment.create({

            data: {
                commentFile: audioKey,
                content: commentDTO.content as string,
                duration: await getAudioDurationInSeconds(audioSignedURL as string),
                Vocal: { connect: { id: userId } },
                Beat: {
                    connect: {
                        producerBeat: {
                            id: beatId,
                            producerId: beatProducerId
                        },
                    },
                },

            },

            select: {
                id: true,
                vocalId: true
            }

        });
        
        return data;

    } catch(error) {

        throw error;

    }

};


export default createCommentByUserId;