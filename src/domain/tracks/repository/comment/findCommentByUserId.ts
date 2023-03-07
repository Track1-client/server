import prisma from '../../../../global/config/prismaClient';


const findCommentByUserId = async(commentId: number, userId: number) => {

    try {

        const data = await prisma.comment.findUnique({

            where: {
                vocalComment: {
                    vocalId: userId,
                    id: commentId
                }
            }
            
        });
        
        return data;

    } catch(error) {

        throw error;

    }

};


export default findCommentByUserId;