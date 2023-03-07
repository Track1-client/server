import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class UpdateVocalPortfolioFail extends AbstractError {

    constructor(...args: any) {

        super(...args);
        this.code = 'G012';
        this.name = 'Update_Vocal_Portfolio_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;

    };
    
};