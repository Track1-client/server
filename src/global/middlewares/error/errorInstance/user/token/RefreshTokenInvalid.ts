import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class RefreshTokenInvalid extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1001';
        this.name = 'Invalid_Refresh_Token';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.UNAUTHORIZED;
    };
};