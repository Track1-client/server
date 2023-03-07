import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';


export class LoginIDNonExists extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'U003';
        this.name = 'UserLoginID_NonExists_In_DB';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.UNAUTHORIZED;

    };

};