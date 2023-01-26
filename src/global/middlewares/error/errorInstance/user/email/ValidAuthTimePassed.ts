import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class ValidAuthTimePassed extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1002';
        this.name = 'Valid_Verify_Time_Passed';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};