import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class InvalidBeatId extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1004';
        this.name = 'Invalid_Beat_Id';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};