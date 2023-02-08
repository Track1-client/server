import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class SendResetPassword extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1002';
        this.name = 'Send_Reset_Password_Mail_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};