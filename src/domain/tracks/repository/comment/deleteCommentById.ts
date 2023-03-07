import prisma from '../../../../global/config/prismaClient';


const deleteCommentById = async(commentId: number, userId: number) => {

    try {

        await prisma.comment.delete({

            where: {
                vocalComment: {
                    id: commentId,
                    vocalId: userId
                }
            }

        });

    } catch(error) {

        throw error;

    }

};


export default deleteCommentById;