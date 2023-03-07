import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';


export class AccessTokenInvalid extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'Ut002';
        this.name = 'Invalid_Access_Token';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.UNAUTHORIZED;

    };
    
};