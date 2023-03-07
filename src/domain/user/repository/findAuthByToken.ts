import prisma from '../../../global/config/prismaClient'


const findAuthByToken = async(token: string) => {

    try {

        let lastDay = Date.now() - (60 * 3 * 60 * 1000);   
        const isValidToken = new Date(lastDay).toISOString();  //! ( 현재시간 - 3시간 ) 을 DateTime 형식으로 

        const auth = await prisma.auth.findFirst({

            where: {
                token,
                createdAt: { gte: isValidToken }   //! 비밀번호 변경 3시간을 초과하지 않았는지 확인 
            },
            select: {
                userId: true,
                userEmail: true,
                tableName: true,
            },

        });
    
        return auth;

    } catch(error) {

        throw error;

    }
};


export default findAuthByToken;