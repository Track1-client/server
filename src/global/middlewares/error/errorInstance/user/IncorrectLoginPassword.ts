import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';


export class IncorrectLoginPassword extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'U002';
        this.name = 'Wrong_LoginPW';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.UNAUTHORIZED;

    };

};