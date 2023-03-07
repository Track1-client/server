import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class InvalidProducerTitlePortfolio extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'G003';
        this.name = 'Invalid_Producer_Title_Portfolio';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.BAD_REQUEST;

    };

};