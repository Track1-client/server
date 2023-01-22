import { AbstractError } from '../../abstractError';

export class LoginIDNonExists extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1000';
        this.name = 'UserLoginID_NonExists_In_DB';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = 401;
    };
};