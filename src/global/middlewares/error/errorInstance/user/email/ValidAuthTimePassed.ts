import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class InvalidVerificationCode extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1002';
        this.name = 'Invalid_Verification_Code';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};