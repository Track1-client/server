import prisma from '../../../global/config/prismaClient';


const findTempUserByEmailAndTime = async(tableName: string, userEmail: string) => {

    try {

        let lastDay = Date.now() - (30 * 60 * 1000);   
        const isValidCode = new Date(lastDay).toISOString();  //! ( 현재시간 - 30분 ) 을 DateTime 형식으로 
        
        const authCode = await prisma.tempUser.findFirst({

            where: {
                tableName,
                userEmail,
                OR: [
                    { createdAt: { gte: isValidCode } },  //! 인증코드 유효시간 30분을 초과하지 않았는지 확인 
                    { updatedAt: { gte: isValidCode } }
                ],
            },
            select: { authCode: true }
        });
        
        return authCode;

    } catch(error) {

        throw error;

    }
    
};


export default findTempUserByEmailAndTime;