import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class RefreshTokenDoesNotExists extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1001';
        this.name = 'Refresh_Token_NonExists';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};