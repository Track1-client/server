import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class ResetPasswordTimePassed extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1002';
        this.name = 'Reset_Password_Time_Is_Finished';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};