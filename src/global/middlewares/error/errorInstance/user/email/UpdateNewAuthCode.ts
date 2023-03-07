import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';


export class UpdateAuthCode extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Ue006';
        this.name = 'Update_Auth_Code_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };

};