import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class RefreshTokenExpired extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1001';
        this.name = 'Refresh_Token_Expired';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.UNAUTHORIZED;
    };
};