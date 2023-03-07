import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class InvalidVocalPortfolio extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'G004';
        this.name = 'Invalid_Vocal_Portfolio';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };
    
};