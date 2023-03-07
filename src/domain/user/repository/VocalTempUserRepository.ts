import { Prisma } from '@prisma/client';
import { VocalCreateDTO } from '../interfaces';
import deleteTempUserByEmail from './tempUser/deleteTempUserByEmail';
import createUser from './user/createUser';


class VocalTempUserRepository {

    async createVocal (vocal: VocalCreateDTO, password: string, location: string, transaction: Prisma.TransactionClient) {
        return createUser.createVocal(vocal, password, location, transaction);
    }

    async deleteTempUser (tableName: string, userEmail: string, transaction: Prisma.TransactionClient) {
        return deleteTempUserByEmail(tableName, userEmail, transaction);
    }

}


export default VocalTempUserRepository;