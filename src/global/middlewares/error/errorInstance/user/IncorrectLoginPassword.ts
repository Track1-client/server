import { AbstractError } from '../../abstractError';

export class IncorrectLoginPassword extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1000';
        this.name = 'Wrong_LoginPW';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = 401;
    };
};