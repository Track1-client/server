import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class InvalidVocalComment extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1004';
        this.name = 'Invalid_Vocal_Comment';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};