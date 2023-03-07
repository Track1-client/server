import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class CreateAuth extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'U001';
        this.name = 'Create_Auth_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;

    };

};