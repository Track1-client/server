import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class InvalidVocalTitlePortfolio extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'G005';
        this.name = 'Invalid_Vocal_Title_Portfolio';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };
    
};