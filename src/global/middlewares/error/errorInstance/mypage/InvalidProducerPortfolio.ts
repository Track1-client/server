import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class InvalidProducerPortfolio extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1006';
        this.name = 'Invalid_Producer_Portfolio';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;
    };
};