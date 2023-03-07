import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class UpdateProducerPortfolioFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'G009';
        this.name = 'Update_Producer_Portfolio_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;

    };
    
};