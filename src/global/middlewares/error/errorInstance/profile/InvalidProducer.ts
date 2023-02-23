import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class InvalidProducer extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1007';
        this.name = 'Invalid_Producer';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};