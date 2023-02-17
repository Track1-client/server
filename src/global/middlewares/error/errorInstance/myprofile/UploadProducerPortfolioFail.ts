import { sc } from '../../../../constants';
import { AbstractError } from '../../abstractError';

export class UploadProducerPortfolioFail extends AbstractError {
    constructor(...args: any) {
        super(...args);
        this.code = '1006';
        this.name = 'Upload_Producer_Portfolio_Fail';
        this.stack = `${this.message}\n${new Error().stack}`;
        this.statusCode = sc.DB_ERROR;
    };
};