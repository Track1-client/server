import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';


export class UnauthorizedUser extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'U005';
        this.name = 'UnauthorizedUser';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.UNAUTHORIZED;

    };

};