import { Prisma } from '@prisma/client';
import { ProducerCreateDTO } from '../interfaces';
import deleteTempUserByEmail from './tempUser/deleteTempUserByEmail';
import createUser from './user/createUser';


class ProducerTempUserRepository {

    async createProducer (producer: ProducerCreateDTO, password: string, location: string, transaction: Prisma.TransactionClient) {
        return await createUser.createProducer(producer, password, location, transaction);
    }

    async deleteTempUser (tableName: string, userEmail: string, transaction: Prisma.TransactionClient) {
        await deleteTempUserByEmail(tableName, userEmail, transaction);
    }

}


export default ProducerTempUserRepository;