import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class CreateAuthCode extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1002';
        this.name = 'Create_Auth_Code_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.INTERNAL_SERVER_ERROR;
    };
};