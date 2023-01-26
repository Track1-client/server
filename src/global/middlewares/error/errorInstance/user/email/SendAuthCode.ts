import { sc } from '../../../../../constants';
import { AbstractError } from '../../../abstractError';

export class SendAuthCode extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1002';
        this.name = 'You_Need_To_Send_AuthCode';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};